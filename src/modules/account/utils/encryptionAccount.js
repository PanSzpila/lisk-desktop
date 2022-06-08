/* istanbul ignore file */
import { extractKeyPair, extractAddressFromPublicKey } from 'src/modules/wallet/utils/account';

export const mockAccount = {
  crypto: {
    kdf: 'argon2id',
    kdfparams: {
      parallelism: 4,
      iterations: 1,
      memory: 2048,
      salt: '30fc0301d36fcdc7bd8204e19a0043fc',
    },
    cipher: 'aes-256-gcm',
    cipherparams: {
      iv: '281d21872c2d303e59850ce4',
      tag: '2458479edf6aea5c748021ae296e467d',
    },
    ciphertext:
      '44fdb2b132d353a5c65f04e5e3afdd531f63abc45444ffd4cdbc7dedc45f899bf5b7478947d57319ea8c620e13480def8a518cc05e46bdddc8ef7c8cfc21a3bd',
  },
  metadata: {
    name: 'test account',
    description: 'ed25519 key pair',
    pubkey: 'c6bae83af23540096ac58d5121b00f33be6f02f05df785766725acdd5d48be9d',
    path: "m/44'/134'/0'",
    address: 'lsktzb4j7e3knk4mkxckdr3y69gtu2nwmsb3hjbkg',
    creationTime: '',
    derivedFromUUID: 'fa3e4ceb-10dc-41ad-810e-17bf51ed93aa',
  },
  uuid: 'ef52c117-d7cc-4246-bc9d-4dd506bef82e',
  version: 1,
};

// eslint-disable-next-line no-unused-vars
const encryptAES256GCMWithPassword = (plainText, password) => mockAccount.crypto;

// eslint-disable-next-line
export function encryptionAccount(recoveryPhrase, password) {
  // Todo
  // 1- we need to generate public/Private key from recoveryPhrase
  // 2- we need to generate address
  // 3- we need to encrypt recovery phrase and privateKey { privateKey, recoveryPhrase }
  // we need to generate the account Schema json

  // const { enableCustomDerivationPath, customDerivationPath } = settings;
  const { privateKey, publicKey, isValid } = extractKeyPair(recoveryPhrase);
  if (!isValid) {
    return 'Error extracting key pair';
  }
  const address = extractAddressFromPublicKey(publicKey);
  const plainText = JSON.stringify({ privateKey, recoveryPhrase });
  const crypto = encryptAES256GCMWithPassword(plainText, password);
  return {
    crypto,
    metadata: {
      name: 'test account',
      description: 'ed25519 key pair',
      pubkey: publicKey,
      derivationPath: "m/44'/134'/0'",
      address,
      creationTime: '',
      derivedFromUUID: 'fa3e4ceb-10dc-41ad-810e-17bf51ed93aa',
    },
    version: 1,
  };
}
