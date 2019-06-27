import React from 'react';
import { PrimaryButtonV2 } from '../toolbox/buttons/button';
import BookmarksList from '../bookmarksList/bookmarksList';
import styles from './bookmarks.css';

const Bookmarks = ({
  bookmarks, token, t, bookmarkRemoved,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <header>
        <h1>{t('Bookmarks')}</h1>
        <PrimaryButtonV2>{t('Add a new bookmark')}</PrimaryButtonV2>
      </header>
      <BookmarksList
        title={t('All bookmarks')}
        enableFilter
        isEditable
        bookmarks={bookmarks}
        bookmarkRemoved={bookmarkRemoved}
        token={token}
        t={t}
      />
    </div>
  </div>
);

export default Bookmarks;
