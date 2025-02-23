import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { generatePassphrase } from '@wallet/utils/passphrase';
import BackupPassphrase from './SavePassphrase';

describe('Register Process - Backup Passphrase', () => {
  let wrapper;

  const passphrase = generatePassphrase();

  const props = {
    passphrase,
    nextStep: spy(),
  };

  it('Should go to next step when clicking confirm', () => {
    wrapper = mount(<BackupPassphrase {...props} />);
    wrapper.find('.yes-its-safe-button').at(1).simulate('click');
    expect(props.nextStep).to.have.been.calledWith();
  });
});
