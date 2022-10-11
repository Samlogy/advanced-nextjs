import Link from 'next/link';
import { useState } from 'react';
import SideBar from '../components/SideBar';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Challenges() {
  const images = [skate, screen];
  const [isOpen, setOpen] = useState(false);

  /* <Carousel
        data={images}
        isAutoPlay
        speed={1000}
        width={250}
        spacing={16}
      /> */
  // <Alert status="success" message={msg} isClose timeClose={3000} />
  /*
   <button onClick={() => setOpen(true)}> open </button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} />
  */
  // <SideBar />
  const msg: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic saepe deleniti eius obcaecati voluptates quidem, nulla iure, esse molestias, consequuntur voluptas atque. Aspernatur temporibus a ipsam velit dolores culpa.';
  return (
    <div>
      <NavBar />
      <SideBar />
    </div>
  );
}

const LINKS = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Shop',
    link: '/shop',
  },
  {
    label: 'Contact',
    link: '/contact',
  },
  {
    label: 'Posts',
    link: '/posts',
  },
  {
    label: 'About',
    link: '/about',
  },
];
function NavBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="navbar--container">
      <div className="navbar--content">
        <div className="navbar--logo">Logo</div>
        <>
          <LanguageSwitcher />
        </>
        <div className="navbar--links">
          {LINKS.map((el: any, idx: number) => (
            <div key={idx} className="navbar--item">
              <Link href={el?.link} passHref>
                <div key={idx}>{el?.label}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
