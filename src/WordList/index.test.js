import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import WordList from '../WordList';

Enzyme.configure({ adapter: new Adapter() });

describe('WordList', () => {
  const props = {
    words: [{"name": "test", "definition": "test"}],
    hideStep: false,
    onDelete: sinon.spy()
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

  it('uses a single table', () => {
    const wrapper = shallow(<WordList {...props} />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('has one word listed with default test props', () => {
    const wrapper = shallow(<WordList {...props} />);
    expect(wrapper.find('td')).toHaveLength(2*props.words.length);
  });

  it('has three words when three words in test props', () => {
    const customProps = {
      words: [
        {name: "test1", definition: "test1"},
        {name: "test2", definition: "test2"},
        {name: "test3", definition: "test3"}
      ],
      hideStep: false
    };
    const wrapper = shallow(<WordList {...customProps} />);
    expect(wrapper.find('td')).toHaveLength(2*customProps.words.length);
  });

  it('has a button with the class of dismiss', () => {
    const wrapper = shallow(<WordList {...props} />);
    expect(wrapper.find('.delete')).toHaveLength(props.words.length);
  });

  it('has a working on delete', () => {
    const wrapper = shallow(<WordList {...props} />);
    wrapper.find('.delete').simulate('click');
    expect(props.onDelete).toHaveProperty('callCount', 1);
  });

});
