import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <main className={styles['main']}>
      <Header></Header>
      <Footer></Footer>
    </main>
  );
}
