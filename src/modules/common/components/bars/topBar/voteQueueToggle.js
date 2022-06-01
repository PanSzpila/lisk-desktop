import React from 'react';

import Tooltip from 'src/theme/Tooltip';
import DialogLink from 'src/theme/dialog/link';
import Icon from 'src/theme/Icon';
import styles from 'src/modules/common/components/bars/topBar/topBar.css';

const SignedInTip = ({ t }) => <p>{t('Voting queue')}</p>;

const VoteQueueToggle = ({
  t, noOfVotes, isUserLogout, disabled,
}) => (
  <Tooltip
    className={styles.tooltipWrapper}
    size="maxContent"
    position={isUserLogout ? 'bottom right' : 'bottom'}
    indent={isUserLogout}
    content={(
      <DialogLink
        component="votingQueue"
        className={`${styles.toggle} voting-queue-toggle ${
          disabled && `${styles.disabled} disabled`
        }`}
      >
        <Icon name="votingQueueInactive" />
        {noOfVotes !== 0 && (
          <span className={styles.votingQueueVoteCount}>{noOfVotes}</span>
        )}
      </DialogLink>
    )}
  >
    <SignedInTip t={t} />
  </Tooltip>
);

export default VoteQueueToggle;
