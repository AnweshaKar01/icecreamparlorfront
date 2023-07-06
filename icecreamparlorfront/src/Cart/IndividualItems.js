import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const IndividualItems = ({
  id,
  title,
  orderCount,
  price,
  grandTotal,
  onDelete,
  onUpdate,
}) => {
  const [addscoop, setAddscoop] = useState(orderCount);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const updateScoop = async (event) => {
    setAddscoop(event.target.value);
    const url = "http://localhost:5000/cart/updateCartItems";
    const headers = {
      "Content-Type": "application/json", // Example header
      Authorization: localStorage.getItem("userId"), // Example header
    };
    const data = {
      cartId: localStorage.getItem("cartId"),
      scoopName: title,
      quantityOrdered: event.target.value,
    };
    const updateRequest = await axios.put(url, data, { headers });
    if (updateRequest.status === 200) {
      console.log(
        "updated price: ",
        grandTotal - updatedPrice + updateRequest.data.price
      );
      onUpdate(grandTotal - updatedPrice + updateRequest.data.price);
      setUpdatedPrice(updateRequest.data.price);
    }
  };
  return (
    <Card>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography variant="h5">{title}</Typography>}
          secondary={
            <Box>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body1"
                color="text.primary"
              >
                50gm per scoop
              </Typography>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Add Scoops
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Add Scoops"
                  value={addscoop}
                  onChange={updateScoop}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="h6">Total Scoops: {addscoop}</Typography>
              <Typography variant="h6">Price : {updatedPrice}</Typography>
            </Box>
          }
        />
        {/* id=scoopsId in the cart */}
        <IconButton onClick={() => onDelete(id)}>
          <DeleteRoundedIcon fontSize="large" color="primary" />
        </IconButton>
      </ListItem>
    </Card>
  );
};
export default IndividualItems;
