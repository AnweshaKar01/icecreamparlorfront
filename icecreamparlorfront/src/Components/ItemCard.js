import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ItemCard = ({ title, price, id, image, amountServed }) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const addToCart = async () => {
    if (localStorage.getItem("cartId")) {
      const cartId = localStorage.getItem("cartId");
      console.log("Cart id: ", cartId);
      const url = "http://localhost:5000/cart/addCartItem";
      const newItemRequest = {
        cartId: cartId,
        scoopName: title,
        price: price,
        quantityOrdered: 1,
      };

      const response = await axios.post(url, newItemRequest);
      if (response.status == 200) {
        setDisabled(true);
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
      <CardActions>
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
