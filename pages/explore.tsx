import { Heading } from '@chakra-ui/react';
import { useState } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

export default function Explore() {
  return (
    <div>
      <Heading as="h2" textAlign="center" mb="1em">
        Modal
      </Heading>
      <Carousel />
    </div>
  );
}

function Carousel() {
  const images = [skate, screen];
  const [currentSlide, setSlide] = useState(1);

  const NB_MAX = 2;

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
    console.log(index + 1);
    setSlide(index + 1);
  }
  return (
    <div className="slider-container">
      <div className="arrow left" onClick={onPrev}>
        <MdOutlineArrowBackIosNew size={24} />
      </div>
      <div className="arrow right" onClick={onNext}>
        <MdOutlineArrowForwardIos size={24} />
      </div>

      <div className="slider">
        {images.map((el, idx) => {
          const isVisible = currentSlide === idx + 1 ? true : false;
          return (
            <img
              key={idx}
              src={el.src}
              alt=""
              className={isVisible ? 'slider-image active' : 'slider-image'}
            />
          );
        })}
      </div>

      <div className="slider-indicators">
        {images.map((_, idx) => {
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
