import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getTxAmount } from '@transaction/utils/transaction';
import { MODULE_ASSETS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import DateTimeFromTimestamp from 'src/modules/common/components/timestamp';
import Icon from 'src/theme/Icon';
import Tooltip from 'src/theme/Tooltip';
import TokenAmount from '@token/fungible/components/tokenAmount';
import WalletVisualWithAddress from '@wallet/components/walletVisualWithAddress';
import { truncateAddress } from '@wallet/utils/account';
import Spinner from 'src/theme/Spinner';
import routes from 'src/routes/routes';
import { getModuleAssetTitle } from '@transaction/utils';
import styles from './row.css';
import TransactionRowContext from '../../context/transactionRowContext';
import TransactionTypeFigure from '../TransactionTypeFigure';
import TransactionAmount from '../TransactionAmount';

export const Sender = () => {
  const { data, avatarSize } = useContext(TransactionRowContext);
  return (
    <WalletVisualWithAddress
      className="transaction-row-sender"
      address={data.sender.address}
      transactionSubject="sender"
      moduleAssetId={data.moduleAssetId}
      showBookmarkedAddress
      size={avatarSize}
    />
  );
};

export const Recipient = () => {
  const { data, avatarSize } = useContext(TransactionRowContext);
  return (
    <WalletVisualWithAddress
      className="transaction-row-recipient"
      address={data.asset.recipient?.address}
      transactionSubject="recipient"
      moduleAssetId={data.moduleAssetId}
      showBookmarkedAddress
      size={avatarSize}
    />
  );
};

export const Counterpart = () => {
  const { data, host, avatarSize } = useContext(TransactionRowContext);

  // Show tx icon
  if (data.moduleAssetId !== MODULE_ASSETS_NAME_ID_MAP.transfer && host) {
    return (
      <TransactionTypeFigure
        moduleAssetId={data.moduleAssetId}
        address={data.sender.address}
      />
    );
  }
  // Show recipient
  if (data.asset.recipient?.address !== host) {
    return (
      <WalletVisualWithAddress
        className="transaction-row-recipient"
        address={data.asset.recipient?.address}
        transactionSubject="recipient"
        moduleAssetId={data.moduleAssetId}
        showBookmarkedAddress
        size={avatarSize}
      />
    );
  }
  // Show sender
  return (
    <WalletVisualWithAddress
      className="transaction-row-sender"
      address={data.sender.address}
      transactionSubject="sender"
      moduleAssetId={data.moduleAssetId}
      showBookmarkedAddress
      size={avatarSize}
    />
  );
};

export const Date = ({ t }) => {
  const { data } = useContext(TransactionRowContext);

  if (data.isPending || !data.block.timestamp) {
    return (
      <Spinner
        completed={!data.isPending || data.block?.timestamp}
        label={t('Pending...')}
      />
    );
  }

  return (
    <DateTimeFromTimestamp time={data.block.timestamp} />
  );
};

export const Amount = () => {
  const {
    data, layout, activeToken, host,
  } = useContext(TransactionRowContext);

  if (layout !== 'full') {
    return (
      <span>
        <TransactionAmount
          host={host}
          token={activeToken}
          showRounded
          recipient={data.asset.recipient?.address}
          moduleAssetId={data.moduleAssetId}
          amount={getTxAmount(data)}
        />
      </span>
    );
  }
  return (
    <span className={styles.amount}>
      <TokenAmount val={getTxAmount(data)} token={activeToken} />
      <span className={`${styles.fee} hideOnLargeViewPort`}>
        <TokenAmount val={data.fee} token={activeToken} />
      </span>
    </span>
  );
};

export const Fee = ({ t }) => {
  const { data, activeToken } = useContext(TransactionRowContext);

  return (
    <span className={styles.transactionFeeCell}>
      <Tooltip
        title={t('Transaction')}
        position="bottom"
        tooltipClassName={`${styles.tooltip} ${styles.tooltipOffset}`}
        content={<TokenAmount val={data.fee} token={activeToken} />}
        size="s"
      >
        <p>{getModuleAssetTitle(t)[data.moduleAssetId]}</p>
      </Tooltip>
    </span>
  );
};

export const Status = ({ t }) => {
  const { data, currentBlockHeight } = useContext(TransactionRowContext);
  const roundSize = 103;
  const height = currentBlockHeight
    ? currentBlockHeight - data.block.height
    : 0;

  return (
    <span>
      <Tooltip
        title={data.isPending ? t('Pending') : t('Confirmed')}
        position="left"
        tooltipClassName={`${styles.tooltip} ${styles.tooltipOffset}`}
        content={<Icon name={data.isPending ? 'pending' : 'approved'} />}
        size="s"
      >
        <p>{`${height}/${roundSize} ${t('Confirmations')}`}</p>
      </Tooltip>
    </span>
  );
};

const generateVotes = (asset, delegates, token, t) => {
  const voteElements = asset.votes.slice(0, 1).map((vote) => (
    <span
      className={`${styles.container} vote-item-address`}
      key={`vote-${vote.delegateAddress}`}
    >
      <Link to={`${routes.wallet.path}?address=${vote.delegateAddress}`}>
        <span className={styles.primaryText}>
          {delegates[vote.delegateAddress]?.dpos.delegate.username
            ?? truncateAddress(vote.delegateAddress)}
        </span>
      </Link>
      <span className={`${styles.value} vote-item-value`}>
        <TokenAmount val={vote.amount} token={token} />
      </span>
    </span>
  ));

  return (
    <div className={styles.voteDetails}>
      {voteElements}
      {asset.votes.length > 1 && (
        <span className={styles.more}>
          {`${asset.votes.length - 1} ${t(
            'more',
          )}...`}
        </span>
      )}
    </div>
  );
};

export const Assets = ({ t }) => {
  const { data, delegates = [], activeToken } = useContext(TransactionRowContext);
  const { voteDelegate, registerDelegate, transfer } = MODULE_ASSETS_NAME_ID_MAP;

  const getDetails = () => {
    switch (data.moduleAssetId) {
      case registerDelegate:
        return data.asset.delegate?.username;
      case voteDelegate:
        return generateVotes(data.asset, delegates, activeToken, t);
      case transfer:
        return data.asset.data;
      default:
        return '-';
    }
  };

  return <span className="transaction-reference">{getDetails()}</span>;
};
