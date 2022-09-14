import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Blog = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // on mount
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    // unmount
    return () => clearTimeout(timer);
  }, []);

  // updated
  useEffect(() => {
    if (count === 3) setCount(0);
  }, [count]);

  return (
    <div>
      <h1>useEffect</h1>
      <button onClick={() => setCount(count + 1)}> + </button>
      <span> {count} </span>
      <button onClick={() => setCount(count - 1)}> - </button>
    </div>
  );
};

export default Blog;
