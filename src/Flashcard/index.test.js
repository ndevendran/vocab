import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Flashcard from '../Flashcard';
import Meaning from '../Meaning';

Enzyme.configure({ adapter: new Adapter() });

describe('Flashcard', () => {
  const props = {
    words: [{"name": "test", "definition": "test"}],
    index: 0,
    hideMeaning: true,
    hideStep: true
  }

  it('loads without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Flashcard {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('snapshot is valid', () => {
    const component = renderer.create(
      <Flashcard {...props} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders one word when step is not hidden', () => {
    const customProps = {
      words: [{"name": "test", "definition": "custom test"}],
      hideStep: false,
      hideMeaning: false,
      index: 0
    };
    const wrapper = shallow(<Flashcard {...customProps} />);
    expect(wrapper.find('.word').length).toBe(1);
  });

  it('renders no words when step is hidden', () => {
    const customProps = {
      words: [{"name": "test", "definition": "custom test"}],
      hideStep: true,
      hideMeaning: false,
      index: 0
    };
    const wrapper = shallow(<Flashcard {...customProps} />);
    expect(wrapper.find('.word').length).toBe(0);
  });

  it('Contains a Meaning component', () => {
    const customProps = {
      words: [{"name": "test", "definition": "custom test"}],
      hideStep: false,
      hideMeaning: false,
      index: 0
    };
    const wrapper = shallow(<Flashcard {...customProps} />);

    const word = customProps.words[customProps.index];
    expect(wrapper.find(Meaning)).toHaveLength(1);
  });
});
