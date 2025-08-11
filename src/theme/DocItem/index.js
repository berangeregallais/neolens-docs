import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import styles from './styles.module.css';

export default function DocItem(props) {
  const {metadata} = props;
  const {lastUpdatedAt} = metadata || {};

  const formatDate = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <OriginalDocItem {...props} />
      {lastUpdatedAt && (
        <footer className={styles.lastUpdated}>
          Last updated date : {formatDate(lastUpdatedAt)}
        </footer>
      )}
    </>
  );
}
