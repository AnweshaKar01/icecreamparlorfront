import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AddItem from "./AddItem";

import DisplayList from "./DisplayList";
import axios from "axios";
const StockEntry = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [stockUpdate, setStockUpdate] = useState(true);
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        console.log("useEffectWorks try");
        const getInventoryItems = await axios.get(
          "http://localhost:5000/inventory/getScoops"
        );
        if (getInventoryItems.status === 200) {
          console.log(getInventoryItems.data);
          setItems(getInventoryItems.data);
          setStockUpdate(false);
        }
      } catch (err) {
        console.log(err.getInventoryItems.data);
      }
    };
    if (stockUpdate === true) {
      console.log("useEffectWorks if");
      fetchInventoryItems();
    }
    console.log("useEffectWorks");
  }, [stockUpdate]);

  return (
    <div>
      <AdminNavBar
        search={search}
        setSearch={setSearch}
        navBarText={"Inventory"}
      />

      <AddItem
        items={items}
        setItems={setItems}
        setStockUpdate={setStockUpdate}
      />

      <h2>Stock Item List</h2>
      <DisplayList
        items={items.filter((item) =>
          (item.title || "").toLowerCase().includes(search.toLowerCase())
        )}
        stockUpdate={stockUpdate}
        setStockUpdate={setStockUpdate}
        setItems={setItems}
      />
    </div>
  );
};

export default StockEntry;
