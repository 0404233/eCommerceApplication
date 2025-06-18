import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './slider.module.css';
import { useEffect, useState, type ReactElement } from 'react';
import { ImageCar } from '../../../types/types';
import Modal from './modal/Modal';
import classNames from 'classnames';

type Props = {
  images: ImageCar[];
  modalContext?: boolean;
  imageIndex?: number;
};

export default function Slider({ images, modalContext = false, imageIndex }: Props): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(imageIndex || 0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <>
      {!modalContext && (
        <Modal isOpen={isModalOpen} closeModal={closeModal} images={images} imageIndex={currentIndex} />
      )}
      <div className={classNames(styles['slider'], { [styles['modalSlider'] as string]: modalContext })}>
        <div
          className={styles['slider-container']}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((el) => (
            <div key={el.url} className={styles['slide-block']} onClick={() => setIsModalOpen(true)}>
              <img className={styles['slide-image']} src={el.url} alt="Car Image" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button className={classNames(styles['slider-arrow'], styles['arrow-left'])} onClick={prevSlide}>
              <ArrowBackIosNewIcon fontSize="large" />
            </button>
            <button className={classNames(styles['slider-arrow'], styles['arrow-right'])} onClick={nextSlide}>
              <ArrowForwardIosIcon fontSize="large" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
