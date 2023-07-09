import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../ContextApi/Context";
//rendered each time itemcard is called in gridItem to map each item
const ItemCard = ({ title, price, id, image, amountServed }) => {
  const [{ cart }, dispatch] = useStateValue();
  // if cart array includes the id of the current item make it disabled
  //id: inventory id

  const [disabled, setDisabled] = useState(cart.includes(id));
  //[cart,id] : whenever a new item is added to the cart
  // the useEffect will disable the new items addTocart button
  useEffect(() => {
    console.log("Cart ids: ", cart);
    setDisabled(cart.includes(id));
  }, [cart, id]);
  const navigate = useNavigate();
  const addToCart = async () => {
    if (localStorage.getItem("cartId")) {
      const cartId = localStorage.getItem("cartId");
      const userId = localStorage.getItem("userId");
      console.log("Cart id: ", cartId);
      console.log("User id: ", userId);
      const url = "http://localhost:5000/cart/addCartItem";
      //to ensure that a user can add items is his own cart only
      const headers = {
        "Content-Type": "application/json", // Example header
        Authorization: userId, // Example header
      };
      const newItemRequest = {
        cartId: cartId,
        scoopName: title,
        price: price,
        quantityOrdered: 1,
      };
      const response = await axios.post(url, newItemRequest, { headers });
      if (response.status === 200) {
        // adding item's id to cart array and add id to the context api state
        dispatch({
          type: "add2Cart",
          data: id,
        });
      } else {
        alert("Could not add items to cart please try again");
        setDisabled(false);
      }
    } else {
      navigate("/login");
      setDisabled(false);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title + "_image"}
      />
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {amountServed}
          <br />
          price: ₹{price}/- per scoop
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          disabled={disabled}
          aria-label="add to cart"
          onClick={addToCart}
          startIcon={<AddCircleIcon color="secondary" elevation={12} />}
          variant="contained"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
