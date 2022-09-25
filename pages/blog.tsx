import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";

import Layout from "../components/Layout";

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
  {
    id: 3,
    title: "Todo 3",
    complete: false,
  },
  {
    id: 4,
    title: "Todo 4",
    complete: false,
  },
];

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo: any) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

export default function Blog() {
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

  // ref
  const countRender = useRef<any>();
  const [inputValue, setInputValue] = useState("");

  const focusInput = () => {
    countRender.current.focus();
  };

  useEffect(() => {
    countRender.current = countRender.current + 1;
  });

  //console.log(countRender);

  // useMemo
  function expensiveCalculation(num: number) {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  }
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  /// useState
  const [text, setText] = useState("");

  const handleInput = (e: any) => {
    const { type, value } = e.target;
    setText((t: string) => t + value);
  };

  //useCallback
  const [todos, setTodos] = useState<any>([]);
  const addTodo = useCallback(() => {
    const len = todos.length + 1;
    const todo = len > 0 ? `todo ${len}` : "todo 1";
    setTodos((t: any) => [...t, todo]);
  }, [todos]);

  console.log(todos);

  // useReducer
  const [tasks, dispatch] = useReducer(reducer, initialTodos);
  const handleComplete = (task: any) => {
    dispatch({ type: "COMPLETE", id: task.id });
  };
  console.log(tasks);

  return (
    <Layout isHeaderVisible>
      <h3>useEffect</h3>
      <button onClick={() => setCount(count + 1)}> + </button>
      <span> {count} </span>
      <button onClick={() => setCount(count - 1)}> - </button>

      <h3>useRef</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span>Render Count: {countRender.current}</span>

      <h3>useMemo</h3>
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>

      <h3>useState</h3>
      <input type="text" onChange={handleInput} />

      <h3>useCallback</h3>
      <button onClick={addTodo}> + Todo</button>

      <h3> useReducer </h3>
      {tasks.map((task: any) => (
        <div key={task.id}>
          <label
            style={{ textDecoration: task.complete ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={task.complete}
              onChange={() => handleComplete(task)}
            />
            {task.title}
          </label>
        </div>
      ))}
    </Layout>
  );
}
