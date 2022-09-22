import React, { useEffect, useState, useCallback, useRef } from "react";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const loadUsers = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        setSearch(json);
      });
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <Filter users={users} setSearch={setSearch} />
      <Listing search={search} />
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
  const debounceV6 = useRef(optimizedV3).current;
  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder="Name or Email"
          onChange={debounceV6}
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
      style={{ display: "flex", flexDirection: "column", margin: ".5em 0" }}
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

function useDebounceV5(callback: any, delay: number) {
  const debounce = callback;

  return debounce;
}
