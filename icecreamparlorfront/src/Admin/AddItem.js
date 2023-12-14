import { useRef, useState } from "react";
import styles from "./AddItem.module.css";
const AddItem = ({ items, setItems }) => {
  const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  const [newItem, setNewItem] = useState({
    id: id,
    title: "",
    price: "",
    quantity: "",
  });
  const saveItems = (e) => {
    e.preventDefault();
    if (newItem.price <= 0.0 || newItem.quantity <= 0) {
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
        localStorage.setItem("stockList", JSON.stringify([...items, newItem]));
        setItems([...items, newItem]);
        setNewItem({
          id: newItem.id + 1,
          title: "",
          price: "",
          quantity: "",
        });
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
          id="addQuantity"
          type="number"
          name="quantity"
          value={newItem.quantity}
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
