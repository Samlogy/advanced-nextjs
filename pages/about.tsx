import { useAmp } from "next/amp";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { TodosContext } from "../contexts/todoContext";
// amp page configuration
export const config = { amp: "hybrid" };

const About = ({ users }: { users: any }) => {
  const isAmp = useAmp();

  // context api logic
  const { todos, dispatch } = useContext(TodosContext);

  const [todo, setTodo] = useState("");
  const inputRef = useRef<any>(null);

  const handleSubmit = (e: any) => {
    //   e.preventDefault();
    inputRef.current.focus();
    dispatch({ type: "ADD_TODO", todo: inputRef.current.value });
    // setTodo("");
    inputRef.current.value = "";
  };

  console.log(todos);

  return (
    <div>
      <h2>AMP About Page</h2>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <Image
          width="300"
          height="300"
          src="/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="a cool image"
        />
      )}

      <input
        type="text"
        placeholder="todo..."
        name="todo"
        ref={inputRef}
        required
        //onChange={(e) => setTodo(e.target.value)}
        //value={todo}
      />

      <button type="submit" onClick={handleSubmit}>
        add todo
      </button>

      {users &&
        users.map((user: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: ".75em",
              padding: ".5em",
              backgroundColor: "lightgray",
              width: "15em",
              borderRadius: "1em",
            }}
          >
            <span> {user.name} </span>
            <span> {user.email} </span>
            <span> {user.username} </span>
            <span> {user.phone} </span>
            <span> {user.website} </span>
          </div>
        ))}
    </div>
  );
};

export default About;

// ISR
export async function getStaticProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = []; //await res.json();

  return {
    props: {
      users,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
