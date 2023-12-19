import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AddItem from "./AddItem";

import DisplayList from "./DisplayList";
import axios from "axios";
const StockEntry = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const getInventoryItems = await axios.get(
          "http://localhost:5000/inventory/getScoops"
        );
        if (fetchInventoryItems.status === 200) {
          setItems(getInventoryItems.data);
        }
      } catch (err) {
        console.log(err.getInventoryItems.data);
      }
    };
    fetchInventoryItems();
  }, []);

  return (
    <div>
      <AdminNavBar
        search={search}
        setSearch={setSearch}
        navBarText={"Inventory"}
      />

      <AddItem items={items} setItems={setItems} />

      <h2>Stock Item List</h2>
      <DisplayList
        items={items.filter((item) =>
          (item.title || "").toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
      />
    </div>
  );
};

export default StockEntry;
