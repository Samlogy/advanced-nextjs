import { Heading } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineClose,
} from 'react-icons/md';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

export default function Challenges() {
  const images = [skate, screen];
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Heading as="h2" textAlign="center" mb="1em">
        Modal
      </Heading>
      {/*
        <Carousel data={images} isAutoPlay speed={1000} />
      */}
      <button onClick={() => setOpen(true)}> open </button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
}

interface IModal {
  isOpen: boolean;
  onClose: any;
  header?: any;
  body?: any;
  footer?: any;
}
function Modal({ isOpen, onClose, header, body, footer }: IModal) {
  if (isOpen)
    return ReactDOM.createPortal(
      <div className="modal--overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <span className="modal--close" onClick={onClose}>
            <MdOutlineClose color="black" size={24} />
          </span>
          <div className="modal--content">
            {header && <div className="modal--header">{header}</div>}
            {body && <div className="modal--body">{body}</div>}
            {footer && <div className="modal--footer"> {footer} </div>}
          </div>
        </div>
      </div>,
      document.body
    );
  return null;
}

interface ICarousel {
  data: any;
  isAutoPlay?: boolean;
  speed?: number;
}

function Carousel({ data, isAutoPlay = false, speed = 500 }: ICarousel) {
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
        {data.map((_, idx: number) => {
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
