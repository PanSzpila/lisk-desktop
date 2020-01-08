const actionTypes = {
  emptyTransactionsData: 'EMPTY_TRANSACTIONS_DATA',
  addNewPendingTransaction: 'ADD_NEW_PENDING_TRANSACTION',
  getTransactions: 'GET_TRANSACTIONS',
  getTransactionsSuccess: 'GET_TRANSACTIONS_SUCCESS',
  getTransactionSuccess: 'GET_TRANSACTION_SUCCESS',
  accountAddVotes: 'ACCOUNT_ADD_VOTES',
  accountLoading: 'ACCOUNT_LOADING',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountRemoved: 'ACCOUNT_REMOVED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountSwitched: 'ACCOUNT_SWITCHED',
  accountUpdated: 'ACCOUNT_UPDATED',
  delegateRegisteredSuccess: 'DELEGATE_REGISTERED_SUCCESS',
  delegateRetrieved: 'DELEGATE_RETRIEVED',
  delegateRetrieving: 'DELEGATE_RETRIEVING',
  delegatesAdded: 'DELEGATES_ADDED',
  dynamicFeesRetrieved: 'DYNAMIC_FEES_RETRIEVED',
  bookmarkAdded: 'BOOKMARK_ADDED',
  bookmarkRemoved: 'BOOKMARK_REMOVED',
  bookmarkUpdated: 'BOOKMARK_UPDATED',
  getNewsFeed: 'GET_NEWS_FEED',
  // TODO next 3 lines should be removed after the new 'network' actions are used everywhere
  liskAPIClientReset: 'LISK_API_CLIENT_RESET',
  liskAPIClientSet: 'LISK_API_CLIENT_SET',
  liskAPIClientUpdate: 'LISK_API_CLIENT_UPDATE',
  loadingFinished: 'LOADING_FINISHED',
  loadingStarted: 'LOADING_STARTED',
  networkSet: 'NETWORK_SET',
  networkStatusUpdated: 'NETWORK_STATUS_UPDATED',
  newBlockCreated: 'NEW_BLOCK_CREATED',
  olderBlocksRetrieved: 'OLDER_BLOCKS_RETRIEVED',
  passphraseUsed: 'PASSPHRASE_USED',
  pendingVotesAdded: 'PENDING_VOTES_ADDED',
  pricesRetrieved: 'PRICES_RETRIEVED',
  removePassphrase: 'REMOVE_PASSPHRASE',
  searchDelegate: 'SEARCH_DELEGATE',
  searchVotes: 'SEARCH_VOTES',
  sendFeedback: 'SEND_FEEDBACK',
  settingsReset: 'SETTINGS_RESET',
  settingsUpdated: 'SETTINGS_UPDATED',
  showEmptyNewsFeed: 'SHOW_EMPTY_NEWS_FEED',
  storeCreated: 'STORE_CREATED',
  switchChannel: 'SWITCH_CHANNEL',
  transactionAddDelegateName: 'TRANSACTION_ADD_DELEGATE_NAME',
  transactionCleared: 'TRANSACTION_CLEARED',
  transactionFailed: 'TRANSACTION_FAILED',
  transactionFailedClear: 'TRANSACTION_FAILED_CLEAR',
  transactionLoadFailed: 'TRANSACTION_LOAD_FAILED',
  transactionLoadRequested: 'TRANSACTION_LOAD_REQUESTED',
  transactionsFailed: 'TRANSACTIONS_FAILED',
  updateTransactions: 'UPDATE_TRANSACTIONS',
  voteLookupStatusCleared: 'VOTE_LOOKUP_STATUS_CLEARED',
  voteLookupStatusUpdated: 'VOTE_LOOKUP_STATUS_UPDATED',
  VotePlaced: 'VOTE_PLACED',
  votesAdded: 'VOTES_ADDED',
  votesCleared: 'VOTES_CLEARED',
  votesUpdated: 'VOTES_UPDATED',
  voteToggled: 'VOTE_TOGGLED',
  deviceListUpdated: 'DEVICE_LIST_UPDATED',
  transactionCreatedSuccess: 'TRANSACTION_CREATED_SUCCESS',
  transactionCreatedError: 'TRANSACTION_CREATED_ERROR',
  resetTransactionResult: 'RESET_TRANSACTION_RESULTS',
  broadcastedTransactionSuccess: 'BROADCAST_TRANSACTION_SUCCESS',
  broadcastedTransactionError: 'BROADCASTED_TRANSACTION_ERROR',
  forgingTimesRetrieved: 'FORGING_TIME_RETRIEVED',
  forgingDataDisplayed: 'FORGING_DATA_DISPLAYED',
  forgingDataConcealed: 'FORGING_DATA_CONCEALED',
};

export default actionTypes;
