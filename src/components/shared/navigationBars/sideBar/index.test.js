import React from 'react';
import { mount } from 'enzyme';
import SideBar from './index';
import menuLinks from './constants';
import routes from '../../../../constants/routes';

describe('SideBar', () => {
  let wrapper;

  const myProps = {
    token: {
      active: 'LSK',
      list: {
        LSK: true,
        BTC: true,
      },
    },
    isUserLogout: false,
    items: menuLinks(v => v),
    location: {
      pathname: routes.dashboard.path,
    },
    t: val => val,
  };

  beforeEach(() => {
    wrapper = mount(<SideBar {...myProps} />);
  });

  it('renders 4 menu items elements', () => {
    const expectedLinks = [
      'Dashboard',
      'Wallet',
      'Delegates',
      'Monitor',
    ];
    expect(wrapper).toContainMatchingElements(4, 'a');
    wrapper.find('a').forEach((link, index) => expect(link).toHaveText(expectedLinks[index]));
  });

  it('renders 4 menu items but only Wallet is disabled when user is logout', () => {
    myProps.isUserLogout = true;
    wrapper = mount(<SideBar {...myProps} />);

    expect(wrapper).toContainMatchingElements(4, 'a');
    expect(wrapper).toContainExactlyOneMatchingElement('a.disabled');
    expect(wrapper.find('a').at(0)).not.toHaveClassName('disabled');
    expect(wrapper.find('a').at(1)).toHaveClassName('disabled');
    expect(wrapper.find('a').at(2)).not.toHaveClassName('disabled');
    expect(wrapper.find('a').at(3)).not.toHaveClassName('disabled');
  });
});
