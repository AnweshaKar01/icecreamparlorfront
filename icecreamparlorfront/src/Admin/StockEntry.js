import React, { useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AddItem from "./AddItem";

import DisplayList from "./DisplayList";
const StockEntry = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("stockList")) || []
  );

  return (
    <div>
      <AdminNavBar items={items} setItems={setItems} navBarText={"admin"} />

      <AddItem items={items} setItems={setItems} />

      <h2>Stock Item List</h2>
      <DisplayList items={items} setItems={setItems} />
    </div>
  );
};

export default StockEntry;
