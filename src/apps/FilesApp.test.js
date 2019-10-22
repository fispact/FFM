import React from 'react';
import ReactDOM from 'react-dom';
import FilesApp from './FilesApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilesApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
