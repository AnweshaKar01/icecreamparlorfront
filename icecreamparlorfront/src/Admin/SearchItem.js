import React from "react";

const SearchItem = ({ items, setItems }) => {
  function onChange(e) {
    setItems((items) => {
      console.log(items);
      return items.filter((item) => {
        console.log(`item=${item},result=${item.title === e.target.value}`);
        return item.title === e.target.value;
      });
    });
  }

  return (
    <form
      className="searchform"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="search" />
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Here"
        onChange={onChange}
      ></input>
    </form>
  );
};

export default SearchItem;
