import React from 'react';
import App from '.';
import {mount} from "enzyme";
import Menu from "../Menu";


const event = (name, checked) => ({
  target: {
    name,
    checked
  }
});

const checkList = (list, expected) => {
  expect(list.find('li').length).toEqual(expected.length);
  expected.forEach((item, index) => {
    expect(list.find('li').at(index).text()).toEqual(item);
  });
};

const selectItem = (wrapper, ...names) => {
  names.forEach((name) =>
    wrapper.find('input[name="'+name+'"]').simulate('change', event(name, true)
    )
  );
};

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App/>);
  });

  it('should render a title and a menu', () => {
    const list = wrapper.find(Menu).find('ul');
    const items = ['Salad', 'Entree', 'Soup'];
    checkList(list, items);
  });

  it('should expand the salad menu when user clicks on Salad', () => {
    selectItem(wrapper, 'Salad');
    const list = wrapper.find('Menu[level=2]').at(0).find('ul');

    const items = ['Santa Fe', 'Greek', 'Asian'];

    checkList(list, items);
  });

  it('should display suggested options when a user clicks on Greek', () => {
    selectItem(wrapper, 'Salad', 'Greek');

    expect(wrapper.find('Menu[level=1]').at(0).find('h4').text()).toEqual('You might also want');

    const list = wrapper.find('Menu[level=2]').at(1).find('ul');
    const items = ['Dressing', 'Bread'];

    checkList(list, items);
  });

  it('should display the choices when Dressing is clicked', () => {
    selectItem(wrapper, 'Salad', 'Greek', 'Dressing');

    const list = wrapper.find('Menu[level=3]').at(1).find('ul');
    const items = ['Italian', 'Blue Cheese', 'Ranch'];

    checkList(list, items);
  })

  it('should display the soup options when the soup menu is clicked', () => {
    selectItem(wrapper, 'Salad', 'Greek', 'Dressing', 'Blue Cheese');

    selectItem(wrapper, 'Soup');

    const list = wrapper.find('Menu[level=2]').at(2).find('ul');
    const items = ['Minestrone', 'Hot and sour', 'Miso'];

    checkList(list, items);
  });

  it('should display the suggested options when Minestrone is clicked', () => {
    selectItem(wrapper, 'Salad', 'Greek', 'Dressing', 'Blue Cheese');

    selectItem(wrapper, 'Soup', 'Minestrone');

    const header = wrapper.find('Menu[level=1]').at(0).find('ul').first().find('li').at(10)
      .find('h4');
    expect(header.text()).toEqual('You might also want');

    const list = wrapper.find('Menu[level=2]').at(3).find('ul');
    const items = ['Bread'];

    checkList(list, items);
  })

  it('should collapse the salad menu if it is unselected', () => {
    selectItem(wrapper, 'Salad', 'Greek', 'Dressing', 'Blue Cheese');

    selectItem(wrapper, 'Soup', 'Minestrone');

    wrapper.find('input[name="Salad"]').simulate('change', event('Salad', false));


    expect(wrapper.find('ul').find('li').first().find('Menu').length).toEqual(0);
    expect(wrapper.find('ul').find('li').at(2).find('Menu').length).toEqual(3);

  });
});

