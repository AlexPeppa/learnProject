import React from 'react';
import styles from './myrouter.module.css';

export const MyRouter = () => (
  <div data-testid='routerDiv' className={styles.wrapper}>
    <span id='routerId'> Настроил роутинг, вроде работает </span>
  </div>
);
