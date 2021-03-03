import React from 'react';
import styles from './style.module.css';

const RepoDetails = ({ repoName, description }) => {
  return (
    <div className={styles.container}>
      <h4>{repoName}</h4>
      <span className={styles.desc}>{description}</span>
    </div>
  )
}

export default RepoDetails
