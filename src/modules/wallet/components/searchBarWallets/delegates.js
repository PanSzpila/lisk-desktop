import React from 'react';
import Highlighter from 'react-highlight-words';
import WalletVisual from '@wallet/components/walletVisual';
import { truncateAddress } from '@wallet/utils/account';
import styles from './walletsAndDeletegates.css';

const Delegates = ({
  delegates, onSelectedRow, t, rowItemIndex, updateRowItemIndex, searchTextValue,
}) => (
  <div className={`${styles.wrapper} delegates`}>
    <header className={`${styles.header} delegates-header`}>
      <label>{t('Account')}</label>
    </header>
    <div className={`${styles.content} delegates-content`}>
      {
      delegates.map((delegate, index) => (
        <div
          key={index}
          data-index={index}
          className={`${styles.accountRow} ${rowItemIndex === index ? styles.active : ''} delegates-row`}
          onClick={() => onSelectedRow(delegate.summary.address)}
          onMouseEnter={updateRowItemIndex}
        >
          <WalletVisual address={delegate.summary.address} />
          <div className={styles.walletInformation}>
            <div>
              <span className={`${styles.delegateName} delegate-name`}>
                <Highlighter
                  highlightClassName={styles.highlight}
                  searchWords={[searchTextValue]}
                  autoEscape
                  textToHighlight={delegate.dpos.delegate.username}
                />
              </span>
            </div>
            <span className={`${styles.accountSubtitle} hideOnLargeViewPort`}>
              {truncateAddress(delegate.summary.address)}
            </span>
            <span className={`${styles.accountSubtitle} showOnLargeViewPort`}>
              {delegate.summary.address}
            </span>
          </div>
          <span className={styles.accountBalance}>
            <span className={styles.tag}>
              {t('Delegate #{{rank}}', { rank: delegate.dpos.delegate.rank })}
            </span>
          </span>
        </div>
      ))
    }
    </div>
  </div>
);

export default Delegates;
