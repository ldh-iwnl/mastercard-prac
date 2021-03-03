import React from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

const Input = ({ className, ...rest }) => {
  return (
    <input className={clsx(className, styles.input)} {...rest} />
  )
}

export default Input
