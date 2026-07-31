import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders the recruiter-focused portfolio', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.textContent).toContain('I build systems that help engineering teams ship faster.');
  expect(div.textContent).toContain('Proof, not promises.');
});
