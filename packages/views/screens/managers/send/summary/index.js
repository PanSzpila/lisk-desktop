/* istanbul ignore file */
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { selectActiveTokenAccount, selectActiveToken } from 'src/redux/selectors';
import {
  resetTransactionResult,
  transactionDoubleSigned,
  transactionCreated,
} from 'src/redux/actions';
import Summary from './summary';

const mapStateToProps = state => ({
  account: selectActiveTokenAccount(state),
  transactions: state.transactions,
  token: selectActiveToken(state),
});

const mapDispatchToProps = {
  resetTransactionResult,
  transactionDoubleSigned,
  transactionCreated,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Summary));
