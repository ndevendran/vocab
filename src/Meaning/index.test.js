import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Meaning from '../Meaning';


describe('Meaning', () => {
  const props = {
    definition: "test",
    hidden: false,
    onClick: () => true,
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Meaning {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(
      <Meaning {...props} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
