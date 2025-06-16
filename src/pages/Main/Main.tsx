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

  const [loaderParams, setLoaderParams] = useState({ radius: 10, stroke: 3 });

  useEffect(() => {
    const updateParams = () => {
      if (window.innerWidth <= 554) {
        setLoaderParams({ radius: 7, stroke: 2 });
      } else {
        setLoaderParams({ radius: 10, stroke: 3 });
      }
    };

    updateParams();
    window.addEventListener('resize', updateParams);

    return () => {
      window.removeEventListener('resize', updateParams);
    };
  }, []);

  useEffect(() => {
    const video = videoRefs.current[currentSlide];
    if (!video) return;

    let frameId: number;

    const updateProgress = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
      frameId = requestAnimationFrame(updateProgress);
    };

    const startProgress = () => {
      video.play().catch(() => {});
      updateProgress();
    };

    if (video.readyState >= 1) {
      startProgress();
    } else {
      video.addEventListener('loadedmetadata', startProgress);
    }

    return () => {
      cancelAnimationFrame(frameId);
      video.removeEventListener('loadedmetadata', startProgress);
    };
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

  const sliderInfo: Record<number, string> = {
    0: 'With the promo code summer15 you can get a 15 percent discount!',
    1: 'Discover amazing deals on new arrivals and save big this season now.',
    2: 'Join our newsletter to receive exclusive offers and special updates.',
    3: 'Experience the best in class service with our dedicated support team.',
  } as const;

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
              <p>{sliderInfo[index]}</p>
            </div>
          </div>
        ))}
      </Slider>
      {currentSlide === 1 ? engineSvg('black') : engineSvg('white')}
      <div className={styles['dots-wrapper']}>
        {videoSources.map((_, index) => {
          const radius = loaderParams.radius;
          const stroke = loaderParams.stroke;
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
