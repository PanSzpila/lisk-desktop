import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditorComp from './editor';

const Editor = (props) => {
  const { t } = useTranslation();
  const account = useSelector(state => state.account);
  return <EditorComp t={t} account={account} {...props} />;
};

export default Editor;
