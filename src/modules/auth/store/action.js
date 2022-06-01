import actionTypes from './actionTypes';

/**
 * Fires an action to reset the account automatic sign out timer
 * @param {Date} date - Current date
 */
export const timerReset = () => ({
  type: actionTypes.timerReset,
  data: new Date(),
});

/**
 * Store second passphrase in the Redux store
 *
 * @param {string} passphrase - Valid Mnemonic passphrase
 * @returns {object} Pure action object
 */
export const secondPassphraseStored = (passphrase) => ({
  type: actionTypes.secondPassphraseStored,
  data: passphrase,
});

/**
 * Removes the second passphrase from the Redux store
 *
 * @returns {object} Pure action object
 */
export const secondPassphraseRemoved = () => ({
  type: actionTypes.secondPassphraseRemoved,
});
