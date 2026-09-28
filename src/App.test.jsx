import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import App from './App';

let container;

function renderPortfolio() {
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<App />, container);
  });

  return container;
}

function click(element) {
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
}

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value: () => {} });
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: () => Promise.resolve(),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    configurable: true,
    get: () => true,
    set: () => {},
  });
});

afterEach(() => {
  if (!container) {
    vi.useRealTimers();
    return;
  }

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  container = undefined;
  vi.useRealTimers();
});

it('renders the dual-track recruiter story and primary proof', () => {
  const view = renderPortfolio();

  expect(view.textContent).toContain('I build systems that help engineering teams ship faster.');
  expect(view.textContent).toContain('Software systems');
  expect(view.textContent).toContain('GenAI & applied ML');
  expect(view.textContent).toContain('Selected work.');
  expect(view.textContent.indexOf('Things I’ve built.')).toBeLessThan(
    view.textContent.indexOf('Experience.')
  );
  expect(view.querySelector('.wordmark-icon').getAttribute('src')).toBe('/favicon copy.png');
  expect(view.querySelector('.maker-seal')).toBeNull();
});

it('filters featured work for an Applied ML recruiter', () => {
  const view = renderPortfolio();
  const appliedMlButton = Array.from(view.querySelectorAll('.lens-console button'))
    .find((button) => button.textContent === 'GenAI & ML');

  click(appliedMlButton);

  const projectText = Array.from(view.querySelectorAll('.trace-card summary'))
    .map((summary) => summary.textContent);

  expect(projectText).toHaveLength(4);
  expect(projectText.join(' ')).toContain('classifAI');
  expect(projectText.join(' ')).toContain('Distributed ML');
  expect(projectText.join(' ')).toContain('F1rstAid');
  expect(projectText.join(' ')).not.toContain('HomeOS');
});

it('expands one project at a time and exposes the ClassifAI live proof', () => {
  const view = renderPortfolio();
  const summaries = Array.from(view.querySelectorAll('.trace-card summary'));
  const homeOsCard = summaries.find((summary) => summary.textContent.includes('HomeOS')).closest('details');
  const classifAiSummary = summaries.find((summary) => summary.textContent.includes('classifAI'));

  expect(homeOsCard.open).toBe(false);
  click(classifAiSummary);

  expect(homeOsCard.open).toBe(false);
  expect(classifAiSummary.closest('details').open).toBe(true);
  expect(view.querySelector('a[href="https://classifai-rsy8.onrender.com/docs"]')).not.toBeNull();
  expect(view.querySelector('video[aria-label^="ClassifAI receiving"]')).not.toBeNull();
});

it('opens and closes the mobile navigation state', () => {
  const view = renderPortfolio();
  const menuButton = view.querySelector('.menu-button');

  expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  click(menuButton);
  expect(menuButton.getAttribute('aria-expanded')).toBe('true');
  expect(view.querySelector('.site-nav').classList.contains('is-open')).toBe(true);
});

it('ships every referenced project-media asset', () => {
  const view = renderPortfolio();
  const mediaPaths = Array.from(view.querySelectorAll('video source, video[poster]'))
    .flatMap((element) => [element.getAttribute('src'), element.getAttribute('poster')])
    .filter(Boolean);

  expect(mediaPaths.length).toBeGreaterThan(0);
  mediaPaths.forEach((mediaPath) => {
    expect(existsSync(resolve(process.cwd(), 'public', mediaPath.replace(/^\//, '')))).toBe(true);
  });
});


it('connects headline outcomes to their supporting case studies', () => {
  const view = renderPortfolio();
  click(view.querySelectorAll('.impact-stat')[1]);
  expect(view.querySelector('#tab-02').getAttribute('aria-selected')).toBe('true');
  expect(view.querySelector('#panel-02').getAttribute('aria-hidden')).toBe('false');
  expect(view.querySelector('#panel-01').getAttribute('aria-hidden')).toBe('true');
});

it('lets visitors pause and resume motion without hiding content', () => {
  const view = renderPortfolio();
  const toggle = view.querySelector('.quick-access button');
  click(toggle);
  expect(toggle.getAttribute('aria-pressed')).toBe('true');
  expect(view.querySelector('.site-shell').classList.contains('motion-paused')).toBe(true);
  expect(toggle.textContent).toBe('Resume motion');
  click(toggle);
  expect(toggle.getAttribute('aria-pressed')).toBe('false');
});

it('uses the existing project content for each featured preview and opens its project card', () => {
  const view = renderPortfolio();
  const featured = [
    ['HomeOS', 'homeos', 'Home dashboard', '/media/homeos-demo-poster.jpg', 'https://demo.homeos-hub.xyz/'],
    ['SpaceTerra', 'spaceterra', 'Browser game', '/media/spaceterra-demo-poster.jpg', 'https://github.com/haramrit09k/spaceterra'],
    ['F1rstAid', 'f1rstaid', 'F-1 immigration RAG assistant', '/media/f1rstaid-demo-poster.jpg', 'https://github.com/haramrit09k/f1rstaid'],
  ];

  expect(Array.from(view.querySelectorAll('.spotlight-picker button'), (button) => button.textContent))
    .toEqual(featured.map(([name]) => name));

  featured.forEach(([name, id, type, poster, projectLink], index) => {
    click(view.querySelectorAll('.spotlight-picker button')[index]);
    const preview = view.querySelector('.studio-preview');
    expect(preview.querySelector('strong').textContent).toBe(name);
    expect(preview.querySelector('small').textContent).toContain(type);
    expect(preview.querySelector('video').getAttribute('poster')).toBe(poster);
    expect(preview.querySelector('img').getAttribute('src')).toBe(poster);
    expect(preview.getAttribute('href')).toBe(`#project-${id}`);
    click(preview);
    const card = view.querySelector(`#project-${id}`);
    expect(card.open).toBe(true);
    expect(card.querySelector(`a[href="${projectLink}"]`)).not.toBeNull();
  });
});

it('starts on the first slideshow preview and case study without selecting personal projects', () => {
  const view = renderPortfolio();
  expect(view.querySelector('.studio-preview strong').textContent).toBe('HomeOS');
  expect(view.querySelector('.spotlight-picker [aria-pressed="true"]').textContent).toBe('HomeOS');
  expect(view.querySelector('.case-tab[aria-selected="true"]').id).toBe('tab-01');
  expect(view.querySelector('#panel-01').getAttribute('aria-hidden')).toBe('false');
  expect(view.querySelector('.lens-console [aria-pressed="true"]')).toBeNull();
  expect(view.querySelector('.trace-card[open]')).toBeNull();
  const summary = view.querySelector('.trace-card summary');
  click(summary);
  expect(summary.closest('details').open).toBe(true);
  click(Array.from(view.querySelectorAll('.lens-console button')).find(button => button.textContent === 'GenAI & ML'));
  expect(view.querySelector('.trace-card[open]')).toBeNull();
});

it('collapses an open case on a second click and reopens it on the next click', () => {
  const view = renderPortfolio();
  const firstCase = view.querySelector('#tab-01');
  click(firstCase);
  expect(firstCase.getAttribute('aria-expanded')).toBe('false');
  expect(view.querySelector('#panel-01').getAttribute('aria-hidden')).toBe('true');
  expect(view.querySelector('.case-placeholder')).not.toBeNull();
  click(firstCase);
  expect(firstCase.getAttribute('aria-expanded')).toBe('true');
  expect(view.querySelector('#panel-01').getAttribute('aria-hidden')).toBe('false');
});

it('advances the project slideshow and resets the timer after a manual choice', () => {
  vi.useFakeTimers();
  const view = renderPortfolio();
  act(() => { vi.advanceTimersByTime(9000); });
  expect(view.querySelector('.studio-preview strong').textContent).toBe('SpaceTerra');

  const f1rstAid = Array.from(view.querySelectorAll('.spotlight-picker button'))
    .find((button) => button.textContent === 'F1rstAid');
  click(f1rstAid);
  expect(view.querySelector('.studio-preview strong').textContent).toBe('F1rstAid');
  act(() => { vi.advanceTimersByTime(8999); });
  expect(view.querySelector('.studio-preview strong').textContent).toBe('F1rstAid');
  act(() => { vi.advanceTimersByTime(1); });
  expect(view.querySelector('.studio-preview strong').textContent).toBe('HomeOS');
});

it('cancels an in-flight project transition when motion is paused', () => {
  const view = renderPortfolio();
  const card = view.querySelector('.trace-card');
  const cancel = vi.fn();
  card.animate = vi.fn(() => ({ cancel }));
  click(card.querySelector('summary'));
  expect(card.animate).toHaveBeenCalledTimes(1);
  click(view.querySelector('.quick-access button'));
  expect(cancel).toHaveBeenCalled();
  card.animate.mockClear();
  click(card.querySelector('summary'));
  expect(card.animate).not.toHaveBeenCalled();
  expect(card.open).toBe(false);
});
