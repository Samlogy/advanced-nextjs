import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

interface ICarousel {
  data: any;
  isAutoPlay?: boolean;
  speed?: number;
}

export default function Carousel({
  data,
  isAutoPlay = false,
  speed = 500,
}: ICarousel) {
  const [currentSlide, setSlide] = useState(1);

  const NB_MAX = 2; //useMemo(() => data.length, []);

  function onPrev() {
    if (currentSlide === 1) {
      setSlide(NB_MAX);
      return;
    }
    setSlide((prev) => prev - 1);
  }
  function onNext() {
    if (currentSlide === NB_MAX) {
      setSlide(1);
      return;
    }
    setSlide((prev) => prev + 1);
  }
  function goTo(index: number) {
    setSlide(index + 1);
  }

  function onAutoPlay() {
    setInterval(onNext, speed);
  }

  //isAutoPlay && onAutoPlay();

  return (
    <div className="slider-container">
      <div className="arrow left" onClick={onPrev}>
        <MdOutlineArrowBackIosNew size={24} />
      </div>
      <div className="arrow right" onClick={onNext}>
        <MdOutlineArrowForwardIos size={24} />
      </div>

      <AnimatePresence>
        <div className="slider">
          {data.map((el: any, idx: number) => {
            const isVisible = currentSlide === idx + 1 ? true : false;
            return (
              <motion.img
                key={idx}
                src={el.src}
                alt=""
                loading="lazy"
                className={isVisible ? 'slider-image active' : 'slider-image'}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  type: 'tween',
                }}
              />
            );
          })}
        </div>
      </AnimatePresence>

      <div className="slider-indicators">
        {data.map((_: any, idx: number) => {
          const isVisible = currentSlide === idx + 1 ? true : false;
          return (
            <span
              key={idx}
              className={isVisible ? 'active' : ''}
              onClick={() => goTo(idx)}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
