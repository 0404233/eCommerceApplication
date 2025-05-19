import CircularProgress from '@mui/material/CircularProgress';
import styles from './loading-spinner.module.css';
import { ReactElement } from 'react';

export default function LoadingSpinner(): ReactElement {
  return (
    <div className={styles['spinner']}>
      <CircularProgress />
    </div>
  );
}
