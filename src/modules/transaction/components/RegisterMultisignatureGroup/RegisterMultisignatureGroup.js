import React from 'react';
import { extractAddressFromPublicKey } from '@wallet/utils/account';
import MultiSignatureReview from '../MultiSignatureReview';

const RegisterMultisignatureGroup = ({ t, transaction }) => {
  const mandatory = transaction.asset.mandatoryKeys.map((item) => ({
    address: extractAddressFromPublicKey(item),
    publicKey: item,
    isMandatory: true,
  }));
  const optional = transaction.asset.optionalKeys.map((item) => ({
    address: extractAddressFromPublicKey(item),
    publicKey: item,
    isMandatory: false,
  }));
  return (
    <MultiSignatureReview
      t={t}
      fee={transaction.fee}
      members={[...mandatory, ...optional]}
      numberOfSignatures={transaction.asset.numberOfSignatures}
    />
  );
};

export default RegisterMultisignatureGroup;
