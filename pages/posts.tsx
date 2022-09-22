import React, { useEffect, useState, useCallback } from "react";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        setSearch(json);
      });
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

  // timeout fct 500ms
  const debounceV1 = (e: any) => {
    setTimeout(() => {
      onHandleChange(e);
    }, 500);
  };

  // memoize + timeout fct 500ms
  const debounceV2 = useCallback(debounceV1, []);

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

  return (
    <div>
      <form className="search" onSubmit={debounceV2}>
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder="Name or Email Username"
          onChange={onHandleChange}
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
