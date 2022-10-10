import { Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

import Modal from '../components/Modal';

export default function Challenges() {
  const images = [skate, screen];
  const [isOpen, setOpen] = useState(false);

  // <Carousel data={images} isAutoPlay speed={1000} />
  const msg =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic saepe deleniti eius obcaecati voluptates quidem, nulla iure, esse molestias, consequuntur voluptas atque. Aspernatur temporibus a ipsam velit dolores culpa.';
  return (
    <div>
      <Heading as="h2" textAlign="center" mb="1em">
        Modal
      </Heading>
      <button onClick={() => setOpen(true)}> open </button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} />

      <Alert status="success" message={msg} isClose />
    </div>
  );
}

function Alert({ status, message, isClose }: any) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={`alert--container ${status}`}>
      <div>
        <MdOutlineClose size={22} onClick={() => setOpen(false)} />
      </div>
      <p className="alert--message"> {message} </p>

      {isClose && (
        <MdOutlineClose
          className="alert--close"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
