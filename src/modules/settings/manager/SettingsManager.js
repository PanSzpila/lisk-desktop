/* istanbul ignore file */
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectActiveTokenAccount } from '@common/store';
import { settingsUpdated } from '@common/store/actions';
import { timerReset } from '@auth/store/action';
import SettingDialog from '../components/SettingDialog';

const mapStateToProps = state => ({
  settings: state.settings,
  transactions: state.transactions,
  account: selectActiveTokenAccount(state),
});

const mapDispatchToProps = {
  timerReset,
  settingsUpdated,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(SettingDialog));
