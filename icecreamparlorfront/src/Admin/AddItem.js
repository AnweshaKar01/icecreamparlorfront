import { useRef, useState } from "react";
import styles from "./AddItem.module.css";
import axios from "axios";
const AddItem = ({ items, setItems }) => {
  const scoopsId = items.length > 0 ? items[items.length - 1].scoopsId + 1 : 1;
  const [newItem, setNewItem] = useState({
    scoopsId: scoopsId,
    title: "",
    price: "",
    amount: "",
  });
  const addItems = async (newItem) => {
    try {
      const addingItem = await axios.post(
        "http://localhost:5000/inventory/addScoops",
        newItem
      );
      const NewList = [...items, addingItem.data];
      setItems(NewList);
      setNewItem({
        scoopsId: newItem.scoopsId + 1,
        title: "",
        price: "",
        amount: "",
      });
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };
  const saveItems = (e) => {
    e.preventDefault();

    if (newItem.price <= 0.0 || newItem.amount <= 0) {
      alert("Fill in all required details");
    } else {
      let isDuplicate = items.filter(
        (item) =>
          (item.title || "").toLowerCase() === newItem.title.toLowerCase()
      );
      console.log(isDuplicate);
      if (isDuplicate.length > 0) {
        alert("Item already added!!");
      } else {
        addItems(newItem);
      }
    }
  };
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  const addref = useRef();
  return (
    <form className={styles} onSubmit={saveItems}>
      <div>
        <label htmlFor="addItems">Add New Item : </label>
        <input
          autoFocus
          ref={addref}
          type="text"
          id="addTitle"
          name="title"
          value={newItem.title}
          placeholder="Add Item title"
          required
          onChange={onChange}
        />
        <input
          autoFocus
          required
          ref={addref}
          name="price"
          id="addPrice"
          type="number"
          value={newItem.price}
          placeholder="Add Item price"
          onChange={onChange}
        />

        <input
          autoFocus
          required
          ref={addref}
          id="addAmount"
          type="number"
          name="amount"
          value={newItem.amount}
          placeholder="Add Item quantity"
          onChange={onChange}
        />
        <button type="submit" onClick={() => addref.current.focus()}>
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddItem;
