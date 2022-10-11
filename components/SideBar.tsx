import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import Link from 'next/link';

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

  const menuIcon = (
    <button type="button" className="btn-icon" onClick={() => setOpen(!isOpen)}>
      {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
    </button>
  );
  return (
    <div className="sidebar--container">
      <div className="sidebar--toggle">{menuIcon}</div>

      {isOpen ? (
        <div className="sidebar--content">
          <div className="logo">Logo</div>
          {LINKS.map((el: any, idx: number) => (
            <div key={idx} className="sidebar--item">
              <Link href={el?.link} passHref>
                <div key={idx} className="sidebar--item">
                  {el?.label}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
