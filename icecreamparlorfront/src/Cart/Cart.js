import { Divider, List } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Navbar";
import IndividualItems from "./IndividualItems";
import { useStateValue } from "../ContextApi/Context";
function Cart(props) {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [cart, setCart] = useState({});
  const onDeleteCartItem = async (scoopsId) => {
    const url = `http://localhost:5000/cart/deleteItem/${scoopsId}`;
    const headers = {
      "Content-Type": "application/json", // Example header
      Authorization: localStorage.getItem("userId"), // Example header
    };
    const deleteItemRequest = await axios.delete(url, { headers });
    if (deleteItemRequest.status === 200) {
      const deletedScoop = cart.allscoops.find(
        (scoop) => scoop.scoopsId === scoopsId
      );
      if (!deletedScoop) return; // Return if no matching scoop is found
      dispatch({
        type: "removefromCart",
        data: deletedScoop.invItemId,
      });
      getCartItems();
    } else {
      alert("item could not be deleted from cart");
    }
  };
  const onUpdateCartItem = (total) => {
    setCart({ ...cart, grandTotal: total });
  };
  const Bill = async () => {
    const url = "http://localhost:5000/bill/purchase";
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("userId"),
    };
    const billingDetails = {
      userName: localStorage.getItem("name"),
    };
    try {
      const purchaseRequest = await axios.post(url, billingDetails, {
        headers,
      });
      if (purchaseRequest.status === 200) {
        navigate(`/bill/${purchaseRequest.data.billId}`);
      }
    } catch (err) {
      console.error("could not purchase: ", err);
    }
  };
  async function getCartItems() {
    if (localStorage.getItem("userId")) {
      const url = `http://localhost:5000/cart/getCartItems/${localStorage.getItem(
        "userId"
      )}`;
      const cartItemRequest = await axios.get(url);
      if (cartItemRequest.status === 200) {
        if (cartItemRequest.data.isPurchased !== true) {
          console.log("cart items: ", cartItemRequest.data);
          setCart(cartItemRequest.data);
        }
      } else {
        alert("Cart is empty");
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <NavBar navBarText={"FlavourEats"}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {Object.keys(cart).length === 0 ? (
          <Typography>Cart is empty</Typography>
        ) : (
          cart.allscoops.map((item) => (
            <Fragment key={item.scoopName}>
              <IndividualItems
                id={item.scoopsId}
                title={item.scoopName}
                price={item.price}
                grandTotal={cart.grandTotal}
                orderCount={item.quantityOrdered}
                onDelete={onDeleteCartItem}
                onUpdate={onUpdateCartItem}
                key={item.scoopsId}
              />
              <Divider variant="inset" component="li" />
            </Fragment>
          ))
        )}
      </List>
      <Typography variant="h6">
        Grand Total: {cart.grandTotal ? cart.grandTotal : 0.0}
      </Typography>
      <Button variant="contained" onClick={() => Bill()}>
        Purchase
      </Button>
    </NavBar>
  );
}

export default Cart;
