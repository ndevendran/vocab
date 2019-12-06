import React from 'react';
import ReactDOM from 'react-dom';
import Meaning from './Meaning';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    definition: "test",
    hidden: false,
    onClick: () => true,
  }
  ReactDOM.render(<Meaning ...props />, div);
  ReactDOM.unmountComponentAtNode(div);
});
