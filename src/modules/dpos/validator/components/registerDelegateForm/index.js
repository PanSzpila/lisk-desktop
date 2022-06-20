/* istanbul ignore file */
import { connect } from 'react-redux';
import { selectActiveTokenAccount } from 'src/redux/selectors';
import Form from './form';

const mapStateToProps = state => ({
  account: selectActiveTokenAccount(state),
  network: state.network,
  signedTransaction: state.transactions.signedTransaction,
  txSignatureError: state.transactions.txSignatureError,
});

export default connect(
  mapStateToProps,
)(Form);
