import React from 'react';
import ReactDOM from 'react-dom';
import FluxesApp from './FluxesApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FluxesApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
