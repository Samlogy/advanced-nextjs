import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdOutlineClose,
  MdWarning,
} from 'react-icons/md';
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

      <Alert status="success" message={msg} isClose timeClose={3000} />
    </div>
  );
}

interface IAlert {
  status: string;
  message: string;
  isClose?: boolean;
  timeClose?: number;
}

function Alert({ status, message, isClose = true, timeClose = 1000 }: IAlert) {
  const [isOpen, setOpen] = useState(true);

  const statusIcons: any = {
    success: <MdCheckCircle size={24} onClick={() => setOpen(false)} />,
    error: <MdError size={24} onClick={() => setOpen(false)} />,
    warning: <MdWarning size={24} onClick={() => setOpen(false)} />,
    info: <MdInfo size={24} onClick={() => setOpen(false)} />,
  };

  useEffect(() => {
    // close after 3s
    if (isOpen) setTimeout(() => setOpen(false), timeClose);
  }, []);

  if (isOpen) {
    return (
      <div className={`alert--container ${status}`}>
        <div>{statusIcons[status]}</div>
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
  return null;
}
