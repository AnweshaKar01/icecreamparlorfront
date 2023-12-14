import React, { useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import styles from "./Modal.module.css";
const UpdateItem = ({ isOpen, setIsOpen, item, items }) => {
  const [editItem, setEditItem] = useState(item);

  const saveEditItem = (e) => {
    e.preventDefault();
    console.log("Save call");
    setIsOpen({ ...isOpen, [item.id]: false });
    addref.current.focus();
    let index = items.find((i) => i.id === item.id);
    items[index] = {
      id: editItem.id,
      title: editItem.title,
      price: editItem.price,
      quantity: editItem.quantity,
    };
    localStorage.setItem("stockList", JSON.stringify(items));
    setEditItem({
      id: "",
      title: "",
      price: "",
      quantity: "",
    });
  };
  const addref = useRef();
  const onChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Edit Item : {editItem.title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form>
              <input
                required
                autoFocus
                id="price"
                name="price"
                type="number"
                placeholder="Edit item price"
                ref={addref}
                value={editItem.price}
                onChange={onChange}
              />

              <input
                required
                autoFocus
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Edit item quantity"
                ref={addref}
                value={editItem.quantity}
                onChange={onChange}
              />
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button type="submit" className={styles} onClick={saveEditItem}>
                Update
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen({ ...isOpen, [item.id]: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateItem;
