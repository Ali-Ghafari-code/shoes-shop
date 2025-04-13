import React from 'react';
import styles from './Loading.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.loader}>
      <img src="/loading.gif" alt="loading..."
      className='z-10 size-42 object-fit' />
    </div>
  );
};

export default LoadingComponent;
