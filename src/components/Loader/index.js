import React from 'react';
import styles from './style.module.css'

const Loader = (props) => {
  return (
    <div className={styles.container} {...props}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  )
}

export default Loader
