import { ReactElement, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './mainPage.module.css';

import one from '../../assets/videos/one.mp4';
import two from '../../assets/videos/two.mp4';
import three from '../../assets/videos/three.mp4';
import four from '../../assets/videos/four.mp4';

import engineSvg from './engine-svg';

const videoSources = [one, four, three, two];

export default function MainPage(): ReactElement {
  const sliderRef = useRef<Slider | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      const video = videoRefs.current[currentSlide];
      if (video && video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
      frameId = requestAnimationFrame(updateProgress);
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(frameId);
  }, [currentSlide]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current: number) => {
      setCurrentSlide(current);
      setProgress(0);
      const video = videoRefs.current[current];
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    },
  };

  const handleVideoEnd = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className={styles['slider-wrapper']}>
      <Slider ref={sliderRef} {...settings}>
        {videoSources.map((src, index) => (
          <div key={index} className={styles['slide']}>
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              autoPlay
              loop={false}
              muted
              playsInline
              onEnded={handleVideoEnd}
              className={styles['slider-video']}
            >
              <source src={src} type="video/mp4" />
            </video>
            <div className={`${styles['slider-info']} ${currentSlide === index ? styles['typing'] : ''}`}>
              <p>Lorem ipsum dolor sit amet consectetur sdfsdfsfsfssfsf sfsfsfsfehguliesfsjfdhskgfuhsfshbfsfhshsds</p>
            </div>
          </div>
        ))}
      </Slider>
      {engineSvg('white')}
      <div className={styles['dots-wrapper']}>
        {videoSources.map((_, index) => {
          const radius = 10;
          const stroke = 3;
          const size = radius * 2 + stroke * 2;
          const circumference = 2 * Math.PI * radius;

          const strokeDashoffset =
            index === currentSlide ? circumference - (progress / 100) * circumference : circumference;

          return (
            <button
              key={index}
              className={`${styles['dot']} ${index === currentSlide ? styles['active'] : ''}`}
              onClick={() => sliderRef.current?.slickGoTo(index)}
            >
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles['progress-ring']}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={stroke}
                  fill="none"
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="red"
                  strokeWidth={stroke}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset 0.1s linear',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                  }}
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
