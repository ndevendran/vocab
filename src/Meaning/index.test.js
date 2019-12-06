import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Meaning from '../Meaning';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });


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

  it('It has one span', () => {
    const wrapper = shallow(<Meaning {...props} />);
    expect(wrapper.find('span').length).toBe(1);
  });



  it('Has a working click', () => {
    const customProps = {
      hidden: true,
      definition: "test",
      onClick: sinon.spy()
    }
    const wrapper = shallow(<Meaning {...customProps} />);
    wrapper.find('.showDefinition').simulate('click');
    expect(customProps.onClick).toHaveProperty('callCount', 1);
  });
});
