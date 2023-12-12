import React, { useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AddItem from "./AddItem";

import DisplayList from "./DisplayList";
const StockEntry = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("stockList")) || []
  );
  const [search, setSearch] = useState("");

  return (
    <div>
      <AdminNavBar
        items={items}
        setItems={setItems}
        search={search}
        setSearch={setSearch}
        navBarText={"Inventory"}
      />

      <AddItem items={items} setItems={setItems} />

      <h2>Stock Item List</h2>
      <DisplayList
        items={items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
      />
    </div>
  );
};

export default StockEntry;
