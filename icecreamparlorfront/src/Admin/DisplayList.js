import React from "react";
import tablestyle from "./StockEntry.module.css";
const DisplayList = ({ items, setItems }) => {
  const onDelete = (id) => {
    const newListItem = items.filter((item) => item.id !== id);
    setItems(newListItem);
    localStorage.setItem("stockList", JSON.stringify(newListItem));
  };
  return (
    <table className={tablestyle}>
      <tr>
        <th>Scoop Id</th>
        <th>Scoop Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
      {items.length > 0 ? (
        items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <button
                onClick={() => {
                  onDelete(item.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <h3>Your List is Empty...</h3>
      )}
    </table>
  );
};

export default DisplayList;
