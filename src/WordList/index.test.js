import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import WordList from '../WordList';

describe('WordList', () => {
  const props = {
    words: [{"name": "test", "definition": "test"}],
    hideStep: true
  };

  it('loads without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<WordList {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <WordList {...props} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
