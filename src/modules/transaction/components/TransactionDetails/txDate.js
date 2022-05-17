import React from 'react';
import DateTimeFromTimestamp from 'src/modules/common/components/timestamp';
import TransactionDetailsContext from '../../context/transactionDetailsContext';
import ValueAndLabel from './valueAndLabel';
import styles from './TransactionDetails.css';

const Date = ({ t }) => {
  const { activeToken, transaction } = React.useContext(
    TransactionDetailsContext,
  );

  return transaction.block?.timestamp ? (
    <ValueAndLabel label={t('Date')} className={styles.date}>
      <span className={`${styles.date} tx-date`}>
        <DateTimeFromTimestamp
          fulltime
          className="date"
          time={transaction.block.timestamp}
          token={activeToken}
          showSeconds
        />
      </span>
    </ValueAndLabel>
  ) : (
    <span>-</span>
  );
};

export default Date;
