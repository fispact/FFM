import React from 'react';
import ReactDOM from 'react-dom';
import InputApp from './InputApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
