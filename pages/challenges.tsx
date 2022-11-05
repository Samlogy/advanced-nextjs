import Link from 'next/link';
import { useCallback, useMemo, useState, useTransition } from 'react';

import screen from '../public/images/screen.png';
import skate from '../public/images/skateboard.jpg';

import { Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
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
  // <NavBar />
  //   <MemoVsCallback />
  //  <TransitionHook />
  const msg: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic saepe deleniti eius obcaecati voluptates quidem, nulla iure, esse molestias, consequuntur voluptas atque. Aspernatur temporibus a ipsam velit dolores culpa.';
  return <div></div>;
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
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="navbar--container"
    >
      <div className="navbar--toggle">
        <button
          type="button"
          className="btn-icon"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <div className="navbar--content">
        <div className="navbar--logo">Logo</div>
        <div className="navbar--tools">
          <LanguageSwitcher />
        </div>
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
    </motion.div>
  );
}

// useMemo vs useCallback
function MemoVsCallback() {
  const [counter1, setCounter1] = useState(0); // Counter 1
  const [counter2, setCounter2] = useState(0); // Counter 1
  // const expensiveValue = computeExpensiveValue(counter1); --> computed on every component render
  const expensiveValueMemoized = useMemo(
    () => computeExpensiveValue(counter1),
    [counter1]
  );

  const memoizedCallback = useCallback(
    () => computeExpensiveValue(counter1),
    [counter1]
  );
  const memoizedValue = useMemo(
    () => computeExpensiveValue(counter1),
    [counter1]
  );

  const memoizedCallbackCalled = useCallback(computeExpensiveValue, [counter1]);

  console.log('memoized function: ', memoizedCallback); // return uncalled function (so i can call it later)
  console.log('memoized value: ', memoizedValue); // calls the function & returns it value
  console.log('memoized function called: ', memoizedCallbackCalled(counter1)); // calls the function & returns it value (similar to useMemo)

  // callback: returns a function which is referentially equal between renders
  // memo: calculte & returns value which referentially equal between renders
  // referential equal: values are equal a do not trigger a re-render --> great form optimization

  return (
    <div>
      <div>
        <h2>Counter 1: {counter1}</h2>
        <button onClick={() => setCounter1(counter1 + 1)}>+</button>
      </div>
      <div>
        <h2>Counter 2: {counter2}</h2>
        <button onClick={() => setCounter2(counter2 + 1)}>+</button>
      </div>

      <div>
        <h2>Expensive Value Memoized:</h2>
        {expensiveValueMemoized}
      </div>
    </div>
  );
}

// Expensive Function
const computeExpensiveValue = (count: number) => {
  // Display on console whenever the function gets call
  console.log('This function is running...');
  // Time Consuming Calcuation
  for (let i = 0; i < 1000000000; i++) {
    count += 1;
  }
  return count;
};
function TransitionHook() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');

  function generateProducts() {
    const products = [];
    for (let i = 0; i < 10000; i++) {
      products.push(`Product ${i + 1}`);
    }
    return products;
  }
  const dummyProducts = generateProducts();

  function filterProducts(filterTerm: string) {
    if (!filterTerm) {
      return dummyProducts;
    }
    return dummyProducts.filter((product) => product.includes(filterTerm));
  }

  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event: any) {
    startTransition(() => {
      setFilterTerm(event.target.value);
      console.log('here');
    });
  }
  console.log(isPending);

  // useTransition: used specially for slow devices (the code is more responsive, less laggy)
  // startTransition: wraps a function responsile for this behaviour (ex: filtering in our case)
  // isPending: boolean value that tells us some state updates that are still pending (hasn't been yet by react) --> so we can show some fallback in the UI.

  return (
    <div id="app">
      <Input
        w="20em"
        type="text"
        placeholder="filter term"
        onChange={updateFilterHandler}
      />
      {isPending && <p style={{ color: 'gray' }}>Updating list..</p>}
      <ul>
        {filteredProducts.map((product, idx) => (
          <li key={idx}>{product}</li>
        ))}
      </ul>
    </div>
  );
}
