import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './slider.module.css';
import { useEffect, useState, type ReactElement } from 'react';
import { ImageCar } from '../../../types/types';

type Props = {
  images: ImageCar[];
};

export default function Slider({ images }: Props): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  const nextSlide = () => {
    if (isAnimated) return;
    setIsAnimated(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimated) return;
    setIsAnimated(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, 500); // because animation is 0.5s
    return () => clearTimeout(timer);
  }, [currentIndex]);
  return (
    <div className={styles['slider']}>
      <div
        className={styles['slider-image-block']}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((el, i) => (
          <img key={i} className={styles['image']} src={el.url} alt="Car Image" />
        ))}
      </div>
      <div className={styles['slider-navigation']}>
        <button className={`${styles['slider-arrow']} ${styles['arrow-left']}`} onClick={prevSlide}>
          <ArrowBackIosNewIcon fontSize="large" />
        </button>
        <button className={`${styles['slider-arrow']} ${styles['arrow-right']}`} onClick={nextSlide}>
          <ArrowForwardIosIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}
