import { useState } from 'react';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

import SideBar from '../components/SideBar';

export default function Challenges() {
  const images = [skate, screen];
  const [isOpen, setOpen] = useState(false);

  // <Carousel data={images} isAutoPlay speed={1000} />
  // <Alert status="success" message={msg} isClose timeClose={3000} />
  const msg: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic saepe deleniti eius obcaecati voluptates quidem, nulla iure, esse molestias, consequuntur voluptas atque. Aspernatur temporibus a ipsam velit dolores culpa.';
  return (
    <div>
      <SideBar />
    </div>
  );
}
