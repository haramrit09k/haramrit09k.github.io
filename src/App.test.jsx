import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders the recruiter-focused portfolio', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.textContent).toContain('I build systems that help engineering teams ship faster.');
  expect(div.textContent).toContain('Software systems');
  expect(div.textContent).toContain('Applied ML');
  expect(div.textContent).toContain('Proof, not promises.');
  expect(div.textContent.indexOf('The reason came first.')).toBeLessThan(
    div.textContent.indexOf('Built by owning the hard parts.')
  );
  expect(div.querySelector('.wordmark-icon').getAttribute('src')).toBe('/favicon copy.png');
  expect(div.querySelector('.maker-seal')).toBeNull();
  expect(div.querySelectorAll('.live-signal')).toHaveLength(3);
  expect(div.textContent).toContain('Private data API-key protected');
});
