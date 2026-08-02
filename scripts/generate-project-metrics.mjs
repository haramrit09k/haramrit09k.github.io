import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

const outputPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/data/project-metrics.json'
);

const targets = [
  {
    id: 'spaceterra',
    label: 'Live game service',
    endpoints: [
      'https://spaceterra.herokuapp.com/api/public/health',
      'https://spaceterra.herokuapp.com/',
    ],
  },
  {
    id: 'homeos',
    label: 'Public demo API',
    endpoints: [
      'https://demo.homeos-hub.xyz/api/public/health',
      'https://demo.homeos-hub.xyz/api/demo/status',
    ],
  },
  {
    id: 'classifai',
    label: 'Model-serving API',
    endpoints: ['https://classifai-rsy8.onrender.com/health'],
  },
];

async function request(url, timeoutMs = 65000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'haramrit09k-portfolio-monitor' },
      redirect: 'follow',
      signal: controller.signal,
    });
    const elapsedMs = Math.round(performance.now() - started);
    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await response.json() : null;
    return { ok: response.ok, statusCode: response.status, elapsedMs, body, url };
  } finally {
    clearTimeout(timeout);
  }
}

function deriveFacts(id, body) {
  if (!body) return [];

  if (id === 'spaceterra' && body.metrics) {
    return [
      Number.isFinite(body.metrics.scoresPersisted)
        ? `${body.metrics.scoresPersisted.toLocaleString('en-US')} scores persisted`
        : null,
      Number.isFinite(body.metrics.playersWithScores)
        ? `${body.metrics.playersWithScores.toLocaleString('en-US')} scoring players`
        : null,
      body.datastore?.status === 'connected' ? 'MongoDB connected' : null,
    ].filter(Boolean);
  }

  if (id === 'homeos') {
    const isDemo = body.mode === 'demo' || body.demoMode === true;
    return [
      isDemo ? 'Isolated demo data' : null,
      body.runtime?.realtimeTransport === 'socket.io' ? 'Socket.IO realtime' : null,
    ].filter(Boolean);
  }

  if (id === 'classifai' && body.model) {
    return [
      body.model.ready ? 'Model ready' : null,
      Number.isFinite(body.model.classCount) ? `${body.model.classCount} classes` : null,
      Number.isFinite(body.model.featureCount)
        ? `${body.model.featureCount.toLocaleString('en-US')} text features`
        : null,
      body.evaluation?.humanValidated === false ? 'Human benchmark pending' : null,
    ].filter(Boolean);
  }

  if (id === 'classifai' && body.model_loaded === true) {
    return ['Model ready'];
  }

  return [];
}

async function probeTarget(target) {
  let wake = null;

  for (const endpoint of target.endpoints) {
    try {
      wake = await request(endpoint);
      if (wake.ok) break;
    } catch (error) {
      wake = { ok: false, error: error.name === 'AbortError' ? 'timeout' : error.message, url: endpoint };
    }
  }

  if (!wake?.ok) {
    return {
      id: target.id,
      label: target.label,
      status: 'unavailable',
      endpoint: wake?.url || target.endpoints[0],
      error: wake?.error || `HTTP ${wake?.statusCode || 'unknown'}`,
    };
  }

  let warm = wake;
  try {
    warm = await request(wake.url, 15000);
  } catch {
    // The first successful response remains authoritative if the warm probe fails.
  }

  const facts = deriveFacts(target.id, wake.body);
  const coldStartVisible = wake.elapsedMs >= 2000 && wake.elapsedMs >= warm.elapsedMs * 2;

  return {
    id: target.id,
    label: target.label,
    status: 'healthy',
    endpoint: wake.url,
    statusCode: wake.statusCode,
    wakeMs: wake.elapsedMs,
    warmMs: warm.ok ? warm.elapsedMs : wake.elapsedMs,
    coldStartVisible,
    facts,
  };
}

const results = await Promise.all(targets.map(probeTarget));
const snapshot = {
  generatedAt: new Date().toISOString(),
  cadence: 'Every 6 hours during portfolio deployment',
  projects: Object.fromEntries(results.map((result) => [result.id, result])),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`Wrote runtime metrics for ${results.length} hosted projects.`);
