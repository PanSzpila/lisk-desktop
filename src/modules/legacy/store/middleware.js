import routes from '@screens/router/routes';
import history from 'src/utils/history';
import actionTypes from '@wallet/store/actionTypes';

const checkAccountMigrationState = (action) => {
  if (action.type === actionTypes.accountLoggedIn || action.type === actionTypes.accountUpdated) {
    const { isMigrated } = action.data.info.LSK.summary;
    // we need to check against false, check against falsy won't work
    if (isMigrated === false) {
      history.push(routes.reclaim.path);
    }
  }
};

const legacyMiddleware = () => next => async (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountUpdated: {
      checkAccountMigrationState(action);
      break;
    }
    default: break;
  }
};

export default legacyMiddleware;
