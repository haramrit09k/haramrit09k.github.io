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
  expect(view.textContent).toContain('Applied ML');
  expect(view.textContent).toContain('Proof, not promises.');
  expect(view.textContent.indexOf('The reason came first.')).toBeLessThan(
    view.textContent.indexOf('Built by owning the hard parts.')
  );
  expect(view.querySelector('.wordmark-icon').getAttribute('src')).toBe('/favicon copy.png');
  expect(view.querySelector('.maker-seal')).toBeNull();
  expect(view.querySelectorAll('.live-signal')).toHaveLength(3);
  expect(view.textContent).toContain('Private data API-key protected');
});

it('filters featured work for an Applied ML recruiter', () => {
  const view = renderPortfolio();
  const appliedMlButton = Array.from(view.querySelectorAll('.lens-console button'))
    .find((button) => button.textContent === 'Applied ML');

  click(appliedMlButton);

  const projectText = Array.from(view.querySelectorAll('.trace-card summary'))
    .map((summary) => summary.textContent);

  expect(projectText).toHaveLength(3);
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

  expect(homeOsCard.open).toBe(true);
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

it('traps focus in the System Index and restores it after Escape', () => {
  const view = renderPortfolio();
  const trigger = view.querySelector('.index-trigger');

  trigger.focus();
  click(trigger);

  const dialog = view.querySelector('[role="dialog"]');
  const closeButton = dialog.querySelector('.index-bar button');
  const focusable = dialog.querySelectorAll('a[href], button:not([disabled])');
  const lastLink = focusable[focusable.length - 1];

  expect(document.activeElement).toBe(closeButton);

  lastLink.focus();
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
  });
  expect(document.activeElement).toBe(closeButton);

  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  });

  expect(view.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
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
