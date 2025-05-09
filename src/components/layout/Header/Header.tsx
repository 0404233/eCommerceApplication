import { ReactElement } from 'react';
import styles from './Header.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Header(): ReactElement {
  const navigate = useNavigate();

  return (
    <header className={styles['header-layout']}>
      <div className={styles['button-group']}>
        <button className={styles['button-header-route']} onClick={() => navigate('/register')}>
          Registration
        </button>
        <button className={styles['button-header-route']} onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </header>
  );
}
