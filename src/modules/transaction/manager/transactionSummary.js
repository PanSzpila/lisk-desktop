// istanbul ignore file
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { secondPassphraseStored } from 'src/modules/auth/store/action';
import { selectActiveToken, selectActiveTokenAccount } from 'src/redux/selectors';
import TransactionSummary from '../components/TransactionSummary/TransactionSummary';

const mapStateToProps = state => ({
  token: selectActiveToken(state),
  transactions: state.transactions,
  wallet: selectActiveTokenAccount(state),
});

const mapDispatchToProps = {
  secondPassphraseStored,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(TransactionSummary);
