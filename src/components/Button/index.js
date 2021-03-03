import React from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

const Button = ({ className, ...rest }) => {
  return (
    <button className={clsx(className, styles.button)} {...rest} />
  )
}

export default Button
