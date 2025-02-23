/* istanbul ignore file */
// This is covered by e2e tests
import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { settingsRetrieved } from 'src/modules/settings/store/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hot } from 'react-hot-loader/root';
import { bookmarksRetrieved } from 'src/modules/bookmark/store/action';
import { watchListRetrieved } from 'src/modules/dpos/validator/store/actions/watchList';
import NotFound from 'src/modules/common/components/NotFound';
import useIpc from '@update/hooks/useIpc';
import FlashMessageHolder from 'src/theme/flashMessage/holder';
import DialogHolder from 'src/theme/dialog/holder';
import OfflineWrapper from 'src/modules/common/components/offlineWrapper';
import CustomRoute from 'src/modules/common/components/customRoute';
import NavigationBars from 'src/modules/common/components/bars';
import ThemeContext from 'src/theme/themeProvider';
import routesMap from 'src/routes/routesMap';
import routes from 'src/routes/routes';
import './variables.css';
import styles from './app.css';

const App = ({ history }) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const theme = useSelector(state => (state.settings.darkMode ? 'dark' : 'light'));

  useIpc(history);

  useEffect(() => {
    setLoaded(true);
    dispatch(bookmarksRetrieved());
    dispatch(settingsRetrieved());
    dispatch(watchListRetrieved());
  }, []);

  const routesList = Object.keys(routes);
  const routeObj = Object.values(routes).find(r => r.path === history.location.pathname) || {};

  return (
    <ThemeContext.Provider value={theme}>
      <OfflineWrapper>
        <DialogHolder history={history} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          draggable
          newestOnTop
          closeButton={false}
          className={styles.toastContainer}
          toastClassName={styles.toastBody}
          bodyClassName={styles.toastText}
        />
        <NavigationBars
          isSignInFlow={routeObj.isSigninFlow}
          location={history.location}
          history={history}
        />
        <main className={`${styles.bodyWrapper} ${loaded ? styles.loaded : ''}`}>
          <section className="scrollContainer">
            <FlashMessageHolder />
            <div className={`${styles.mainContent} ${styles.mainBox}`}>
              <Switch>
                {
                  routesList.map(route => (
                    <CustomRoute
                      key={routes[route].path}
                      route={routes[route]}
                      path={routes[route].path}
                      exact={routes[route].exact}
                      isPrivate={routes[route].isPrivate}
                      forbiddenTokens={routes[route].forbiddenTokens}
                      component={routesMap[route]}
                      history={history}
                    />
                  ))
                }
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </section>
        </main>
      </OfflineWrapper>
    </ThemeContext.Provider>
  );
};

export default withRouter(App);
export const DevApp = hot(withRouter(App));
