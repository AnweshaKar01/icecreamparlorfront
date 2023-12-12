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
    if (
      newItem.title === null ||
      newItem.price === 0.0 ||
      newItem.quantity <= 0
    ) {
      alert("Fill in all required details");
    } else {
      localStorage.setItem("stockList", JSON.stringify([...items, newItem]));
    }
  };
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addref = useRef();
  return (
    <form className={styles} onSubmit={saveItems}>
      <div>
        <label>Add New Item : </label>
        <input
          autoFocus
          ref={addref}
          name="title"
          value={newItem.title}
          placeholder="Add Item title"
          onChange={onChange}
        />
        <input
          autoFocus
          name="price"
          ref={addref}
          value={newItem.price}
          placeholder="Add Item price"
          onChange={onChange}
        />

        <input
          autoFocus
          ref={addref}
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
