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
  if (!container) return;

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  container = undefined;
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
  expect(view.querySelector('#panel-02').hidden).toBe(false);
  expect(view.querySelector('#panel-01').hidden).toBe(true);
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

it('opens the project chosen in the hero spotlight', () => {
  const view = renderPortfolio();
  const picker = Array.from(view.querySelectorAll('.spotlight-picker button'))
    .find((button) => button.textContent === 'classifAI');
  click(picker);
  expect(view.querySelector('.studio-preview strong').textContent).toBe('classifAI');
  click(view.querySelector('.studio-preview'));
  const card = Array.from(view.querySelectorAll('.trace-card')).find((item) => item.textContent.includes('classifAI'));
  expect(card.open).toBe(true);
});

it('starts without selected previews, cases, filters, or expanded projects', () => {
  const view = renderPortfolio();
  expect(view.querySelector('.studio-preview strong').textContent).toBe('Choose a project');
  expect(view.querySelector('.spotlight-picker [aria-pressed="true"]')).toBeNull();
  expect(view.querySelector('.case-tab[aria-selected="true"]')).toBeNull();
  expect(view.querySelector('.lens-console [aria-pressed="true"]')).toBeNull();
  expect(view.querySelector('.trace-card[open]')).toBeNull();
  const summary = view.querySelector('.trace-card summary');
  click(summary);
  expect(summary.closest('details').open).toBe(true);
  click(Array.from(view.querySelectorAll('.lens-console button')).find(button => button.textContent === 'GenAI & ML'));
  expect(view.querySelector('.trace-card[open]')).toBeNull();
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
