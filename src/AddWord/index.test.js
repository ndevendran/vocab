import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddWord from '../AddWord';


describe('AddWord', () => {
  const props = {
    onClick: () => true,
    hideStep: false
  }

  it('loads without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddWord {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('snapshot test', () => {
    const component = renderer.create(
      <AddWord {...props} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
