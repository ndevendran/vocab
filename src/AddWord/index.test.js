import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import AddWord from '../AddWord';
import {InputGroup, Button} from 'react-bootstrap';

Enzyme.configure({ adapter: new Adapter() });

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

  it('has two InputGroups', () => {
    const wrapper = shallow(<AddWord {...props} />);
    expect(wrapper.find(InputGroup)).toHaveLength(2);
  });

  it('has one Button', () => {
    const wrapper = shallow(<AddWord />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('contains the right classes', () => {
    const wrapper = shallow(<AddWord />);
    expect(wrapper.find('.wordInput')).toHaveLength(1);
    expect(wrapper.find('.definitionInput')).toHaveLength(1);
  });

  it('has an active click', () => {
    const customProps = {
      onClick: sinon.spy(),
      hideStep: false
    };
    const wrapper = shallow(<AddWord {...customProps} />);
    wrapper.find(Button).simulate('click');
    expect(customProps.onClick).toHaveProperty('callCount', 1);
  });

});
