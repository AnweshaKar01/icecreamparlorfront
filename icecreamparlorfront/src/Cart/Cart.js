import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { Divider, List } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IndividualItems from "./IndividualItems";
import { IcecreamContext } from "../ContextApi/Context";
function Cart(props) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { grandTotal, setGrandTotal } = useContext(IcecreamContext);

  const onDeleteCartItem = async (id) => {
    const url = `http://localhost:5000/cart/deleteItem/${id}`;
    const deleteItemRequest = await axios.delete(url);
    if (deleteItemRequest.status == 200) {
      setCartItems((items) => items.filter((i) => i.scoopsId !== id));
      setGrandTotal();
    } else {
      alert("item could not be deleted from cart");
    }
  };
  const Bill = () => {
    navigate("/bill");
  };
  const Home = () => {
    navigate("/");
  };
  useEffect(() => {
    async function getCartItems() {
      if (localStorage.getItem("userId")) {
        const url = `http://localhost:5000/cart/getCartItems/${localStorage.getItem(
          "userId"
        )}`;
        const cartItemRequest = await axios.get(url);
        if (cartItemRequest.status == 200) {
          console.log("cart items: ", cartItemRequest.data);
          setCartItems(cartItemRequest.data.allscoops);
          setGrandTotal(cartItemRequest.data.grandTotal);
        } else {
          alert("could not find items in your cart");
        }
      } else {
        navigate("/login");
      }
    }
    getCartItems();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "italic", fontSizeAdjust: "inherit" }}
            color="azure"
          >
            FlavorEats
          </Typography>

          <Box>
            <Button
              onClick={() => Home()}
              variant="filled"
              startIcon={<HomeIcon />}
              color="#000000"
              sx={{ backgroundColor: "#ffffff" }}
            >
              Home
            </Button>
          </Box>
          <Box>
            <IconButton>
              <AccountCircleIcon fontSize="large" color="white" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ pt: 3, pl: 1, pr: 1, flexGrow: 1 }}>
        <Toolbar />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {cartItems === [] ? (
            <Typography>Cart is empty</Typography>
          ) : (
            cartItems.map((item) => (
              <Fragment key={item.scoopName}>
                <IndividualItems
                  id={item.scoopsId}
                  title={item.scoopName}
                  price={item.price}
                  orderCount={item.quantityOrdered}
                  onDelete={onDeleteCartItem}
                />
                <Divider variant="inset" component="li" />
              </Fragment>
            ))
          )}
        </List>
        <Typography variant="h6">Grand Total: {grandTotal}</Typography>
        <Button variant="contained" onClick={() => Bill()}>
          Purchase
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;
