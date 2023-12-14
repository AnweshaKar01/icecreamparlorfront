import React, { useEffect, useState } from "react";
import tablestyle from "./StockEntry.module.css";
import deleteStyle from "./Modal.module.css";
import UpdateItem from "./UpdateItem";
const DisplayList = ({ items, setItems }) => {
  const onDelete = (id) => {
    const newListItem = items.filter((item) => item.id !== id);
    setItems(newListItem);
    localStorage.setItem("stockList", JSON.stringify(newListItem));
  };
  const [isOpen, setIsOpen] = useState({});
  const [sortType, setSortType] = useState("id");
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        title: "title",
        id: "id",
      };
      const sortItems = types[type];

      const sorted = [...items].sort((a, b) =>
        sortItems === "id"
          ? a[sortItems] - b[sortItems]
          : a.title.localeCompare(b.title)
      );
      setItems(sorted);
    };

    sortArray(sortType);
  }, [sortType]);
  return (
    <table className={tablestyle}>
      <thead>
        <tr>
          <th>Scoop Id</th>
          <th>Scoop Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="title">1.Sort Title </option>
              <option value="id">2.Sort id</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className={deleteStyle}
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className={deleteStyle}
                  onClick={() => {
                    setIsOpen({ ...isOpen, [item.id]: true });
                  }}
                >
                  Edit
                </button>
                {isOpen[item.id] && (
                  <UpdateItem
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    item={item}
                    items={items}
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <h3>No items found.</h3>
        )}
      </tbody>
    </table>
  );
};

export default DisplayList;
