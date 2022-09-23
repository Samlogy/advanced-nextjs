import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useDebugValue,
} from "react";
import useDebounce from "../hooks/useDebounce";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const loadUsers = useCallback(async () => {
    let res: any = await fetch("https://jsonplaceholder.typicode.com/users");
    res = await res.json();
    setUsers(res);
    setSearch(res);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  // HOC: (conditional rendering)
  const withLoading = (Component: any) => {
    return function EnhancedComponent({ isLoading, ...props }: any) {
      if (!isLoading) {
        return <Component {...props} />;
      }
      return <div>The component is loading</div>;
    };
  };

  // create a new component using HOC
  const HocLoading = withLoading(Component);

  return (
    <div>
      {/* 
      <Filter users={users} setSearch={setSearch} />
      <Listing search={search} />
     */}

      <HocLoading isLoading={false} />
    </div>
  );
}

const Filter = ({ users, setSearch }: any) => {
  const handleSubmit = (e: any) => e.preventDefault();

  // no optimization
  const onHandleChange = (e: any) => {
    const target = e.target;
    let value = target.type == "checkbox" ? target.checked : target.value;
    if (!value) return setSearch(users);
    value.toLowerCase();

    const result = users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );

    console.log(result);

    setSearch(result);
  };
  // timeout fct 500ms
  const debounceV1 = (e: any) => {
    setTimeout(() => {
      onHandleChange(e);
    }, 500);
  };

  // memoize + timeout fct 500ms
  const debounceV2 = useCallback(debounceV1, []);

  // callBack + timeout (500ms) + clear fct
  const debounceV3 = (func: any) => {
    let timer: any;
    return (...args: any) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 650);
    };
  };
  const optimizedV3 = useCallback(debounceV3(onHandleChange), []);

  // use loadash --> import { debounce } from "lodash";

  const debounceV4 = useRef(debounceV1).current;
  // timeout + callback + ref
  const debounceV5 = useRef(useCallback(debounceV1, [])).current;
  // version + ref
  const debounceV6 = useRef(optimizedV3).current; //useDebounce(debounceV3(onHandleChange), 500)
  // same as V6 by with custom hook instead of fct
  const debounceV7 = useDebounce(onHandleChange);

  // useDebugValue
  useDebugValue("Filter cpt");
  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder="Name or Email"
          onChange={debounceV7}
          autoFocus
        />
        <button className="search__button">Search</button>
      </form>
    </div>
  );
};

const Listing = ({ search }: any) => {
  const results = search?.map((user: any, idx: number) => (
    <div
      key={idx}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: ".5em 0",
        backgroundColor: "lightgray",
        width: "10em",
        padding: ".5em",
        borderRadius: ".5em",
        overflow: "hidden",
      }}
    >
      <span> {user?.id} </span>
      <span> {user?.name} </span>
      <span> {user?.email} </span>
    </div>
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Users</p>
    </article>
  );

  return <main>{content}</main>;
};

const Component = (props: any) => {
  return (
    <div>
      <h3> Component Loaded </h3>
    </div>
  );
};
