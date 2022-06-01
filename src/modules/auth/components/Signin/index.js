/* istanbul ignore file */
import { connect } from 'react-redux';
import { setDefaults, withTranslation } from 'react-i18next';
import { selectActiveTokenAccount } from '@common/store';
import { settingsUpdated } from 'src/modules/settings/store/actions';
import Login from './login';

setDefaults({
  wait: true,
  withRef: false,
  bindI18n: 'languageChanged loaded',
  bindStore: 'added removed',
  nsMode: 'default',
  withTranslationFuncName: 't',
});

const mapStateToProps = state => ({
  account: selectActiveTokenAccount(state),
  network: state.network,
  settings: state.settings,
});

const mapDispatchToProps = {
  settingsUpdated,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login));
