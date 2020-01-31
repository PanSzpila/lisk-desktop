import { withTranslation } from 'react-i18next';
import React from 'react';
import { sizeOfString } from '../../../../../utils/helpers';
import AccountInfo from './accountInfo';
import BoxRow from '../../../../toolbox/box/row';
import TransactionTypeFigure from '../../../wallet/transactions/typeFigure/TransactionTypeFigure';
import TransactionVotes from './transactionVotes';
import styles from './transactionDetailView.css';
import transactionTypes from '../../../../../constants/transactionTypes';


function getDelegateName(transaction) {
  return transaction.asset && transaction.asset.delegate && transaction.asset.delegate.username;
}

class TransactionDetailView extends React.Component {
  render() {
    const {
      transaction,
      children,
      activeToken,
      netCode,
      t,
    } = this.props;
    const { senderLabel, title } = transactionTypes.getByCode(transaction.type || 0);
    return (transaction.id ? (
      <React.Fragment>
        {title ? (
          <div className={styles.summaryHeader}>
            <TransactionTypeFigure
              address={transaction.senderId}
              transactionType={transaction.type}
            />
            <h2 className="tx-header">{title}</h2>
          </div>
        ) : null}
        <BoxRow className={styles.detailsWrapper}>
          <AccountInfo
            name={getDelegateName(transaction)}
            token={activeToken}
            netCode={netCode}
            address={transaction.senderId}
            addressClass="sender-address"
            label={senderLabel}
          />
        </BoxRow>
        {transaction.type === transactionTypes().send.code
          ? (
            <BoxRow className={styles.detailsWrapper}>
              <AccountInfo
                token={activeToken}
                netCode={netCode}
                address={transaction.recipientId}
                addressClass="receiver-address"
                label={t('Recipient')}
              />
            </BoxRow>
          )
          : null
        }
        {children}
        { transaction.type === transactionTypes().send.code
          ? (
            <BoxRow className={styles.message}>
              <div className={`${styles.detailsWrapper}`}>
                <span className={styles.label}>{t('Message')}</span>
                <div className={`${styles.value} tx-reference`}>
                  {transaction.asset && typeof transaction.asset.data === 'string' ? transaction.asset.data : '-'}
                </div>
              </div>
              <div className={`${styles.detailsWrapper}`}>
                <span className={styles.label}>{t('Size')}</span>
                <div className={`${styles.value} tx-size`}>
                  {`${sizeOfString(transaction.asset.data)} bytes`}
                </div>
              </div>
            </BoxRow>
          ) : null
        }
        { transaction.type === transactionTypes().vote.code && transaction.votesName ? (
          <TransactionVotes votes={transaction.votesName} />
        ) : null
        }
      </React.Fragment>
    ) : null);
  }
}

TransactionDetailView.defaultProps = {
  children: null,
};

export default withTranslation()(TransactionDetailView);
