import React, { useEffect, useState } from "react";

export default function posts() {
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

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    if (!value) return setSearch(users);

    const result = users?.filter((user: any) => user.name.includes(value));

    console.log(result);

    setSearch(result);
  };

  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder="Search ..."
          onChange={handleSearchChange}
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
