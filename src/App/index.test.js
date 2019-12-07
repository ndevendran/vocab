import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import Flashcard from '../Flashcard';
import AddWord from '../AddWord';
import WordList from '../WordList';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
  const props = {
    list: [{name: "test1", definition: "test"}]
  };

  it('loads without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has navigation to add words', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('#addWord')).toHaveLength(1);
  });

  it('has navigation to flashcards', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('#flashcards')).toHaveLength(1);
  });

  it('has navigation to the word list', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('#wordList')).toHaveLength(1);
  });

  it('should see add flashcards by default', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(Flashcard)).toHaveLength(1);
  });

  it('should change to add card when add card nav is clicked', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(AddWord)).toHaveLength(0);
    wrapper.find('#addWord').simulate('click');
    expect(wrapper.find(AddWord)).toHaveLength(1);
    expect(wrapper.find(Flashcard)).toHaveLength(0);
    expect(wrapper.find(WordList)).toHaveLength(0);
  });

  it('should change to word list when word list nav is clicked', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(WordList)).toHaveLength(0);
    wrapper.find('#wordList').simulate('click');
    expect(wrapper.find(WordList)).toHaveLength(1);
    expect(wrapper.find(AddWord)).toHaveLength(0);
    expect(wrapper.find(Flashcard)).toHaveLength(0);
  });

  it('should change back to flashcard when we navigate away and back', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find('#wordList').simulate('click');
    expect(wrapper.find(Flashcard)).toHaveLength(0);
    wrapper.find('#flashcards').simulate('click');
    expect(wrapper.find(Flashcard)).toHaveLength(1);
    expect(wrapper.find(WordList)).toHaveLength(0);
    expect(wrapper.find(AddWord)).toHaveLength(0);
  });

  //it should remove word from list when delete is clicked
  //it should add word to list when input is filled out and add is clicked
  //added word should appear in word list
})
