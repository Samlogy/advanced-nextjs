import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Portal from './Portal';

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
export default function SideBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="sidebar--container">
      <div className="sidebar--toggle">
        <button
          type="button"
          className="btn-icon"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {isOpen ? (
        <Portal>
          <div className="sidebar--content">
            <div className="logo">Logo</div>
            {LINKS.map((el: any, idx: number) => (
              <div key={idx} className="sidebar--item">
                <Link href={el?.link} passHref>
                  <div key={idx}>{el?.label}</div>
                </Link>
              </div>
            ))}
          </div>
        </Portal>
      ) : (
        ''
      )}
    </div>
  );
}
