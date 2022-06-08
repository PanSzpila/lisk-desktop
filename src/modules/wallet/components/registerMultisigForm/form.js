import React, { useState, useEffect, useMemo } from 'react';

import BoxContent from 'src/theme/box/content';
import { TertiaryButton } from 'src/theme/buttons';
import { Input } from 'src/theme';
import { MODULE_ASSETS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import TxComposer from '@transaction/components/TxComposer';
import ProgressBar from '../RegisterMultisigView/ProgressBar';
import { MAX_MULTI_SIG_MEMBERS } from '../../configuration/constants';
import MemberField from './MemberField';
import validators from './validators';
import styles from './styles.css';

const placeholderMember = {
  publicKey: undefined,
  isMandatory: true,
};

const getInitialMembersState = (prevState) =>
  prevState.members ?? [placeholderMember];
const getInitialSignaturesState = (prevState) =>
  prevState.numberOfSignatures ?? 2;

export const validateState = ({
  mandatoryKeys,
  optionalKeys,
  requiredSignatures,
  t,
}) => {
  const messages = validators
    .map((scenario) => {
      if (scenario.pattern(mandatoryKeys, optionalKeys, requiredSignatures)) {
        return scenario.message(t, mandatoryKeys, optionalKeys);
      }
      return null;
    })
    .filter((item) => !!item);

  return {
    error: (mandatoryKeys.length + optionalKeys.length) ? messages.length : -1,
    messages,
  };
};

// eslint-disable-next-line max-statements
const Editor = ({
  t, nextStep, prevState = {},
}) => {
  const [requiredSignatures, setRequiredSignatures] = useState(() =>
    getInitialSignaturesState(prevState));
  const [members, setMembers] = useState(() =>
    getInitialMembersState(prevState));

  const [mandatoryKeys, optionalKeys] = useMemo(() => {
    const mandatory = members
      .filter((member) => member.isMandatory && member.publicKey)
      .map((member) => member.publicKey)
      .sort();

    const optional = members
      .filter((member) => !member.isMandatory && member.publicKey)
      .map((member) => member.publicKey)
      .sort();

    return [mandatory, optional];
  }, [members]);

  const addMemberField = () => {
    if (members.length < MAX_MULTI_SIG_MEMBERS) {
      setMembers((prevMembers) => [...prevMembers, placeholderMember]);
    }
  };

  const changeMember = ({ index, publicKey, isMandatory }) => {
    const newMember = { publicKey, isMandatory };
    const newMembers = [
      ...members.slice(0, index),
      newMember,
      ...members.slice(index + 1),
    ];
    setMembers(newMembers);
  };

  const deleteMember = (index) => {
    if (members.length === 1) {
      changeMember({ index, publicKey: '', isMandatory: false });
    } else {
      const newMembers = [
        ...members.slice(0, index),
        ...members.slice(index + 1),
      ];
      setMembers(newMembers);
    }
  };

  const changeRequiredSignatures = (e) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setRequiredSignatures(value);
  };

  const onConfirm = (rawTx) => {
    nextStep({ rawTx });
  };

  useEffect(() => {
    const difference = requiredSignatures - members.length;
    if (difference > 0) {
      const newMembers = new Array(difference).fill(placeholderMember);
      setMembers((prevMembers) => [...prevMembers, ...newMembers]);
    }
  }, [requiredSignatures]);

  const feedback = useMemo(
    () =>
      validateState({
        mandatoryKeys,
        optionalKeys,
        requiredSignatures,
        t,
      }),
    [mandatoryKeys, optionalKeys, requiredSignatures],
  );

  const transaction = {
    moduleAssetId: MODULE_ASSETS_NAME_ID_MAP.registerMultisignatureGroup,
    isValid: feedback.error === 0,
    asset: {
      mandatoryKeys,
      optionalKeys,
      requiredSignatures,
    },
  };

  // @todo pass feedback message too

  return (
    <section className={styles.wrapper}>
      <TxComposer
        className={styles.box}
        transaction={transaction}
        onConfirm={onConfirm}
      >
        <>
          <header className={styles.header}>
            <h1>{t('Register multisignature account')}</h1>
          </header>
          <BoxContent className={styles.contentContainer}>
            <ProgressBar current={1} />
            <div>
              <span className={styles.requiredSignaturesHeading}>
                {t('Required signatures')}
              </span>
              <Input
                className={`${styles.requiredSignaturesInput} multisignature-editor-input`}
                value={requiredSignatures ?? ''}
                onChange={changeRequiredSignatures}
                autoComplete="off"
                name="required-signatures"
              />
            </div>
            <div
              className={`${styles.membersControls} multisignature-members-controls`}
            >
              <span>{t('Members')}</span>
              <TertiaryButton
                size="s"
                disabled={members.length >= 64}
                onClick={addMemberField}
                className="add-new-members"
              >
                +
                {' '}
                {t('Add')}
              </TertiaryButton>
            </div>
            <div className={styles.contentScrollable}>
              {members.map((member, i) => (
                <MemberField
                  key={i}
                  t={t}
                  {...member}
                  index={i}
                  showDeleteIcon={members.length > requiredSignatures}
                  onChangeMember={changeMember}
                  onDeleteMember={deleteMember}
                />
              ))}
            </div>
          </BoxContent>
        </>
      </TxComposer>
    </section>
  );
};

export default Editor;
