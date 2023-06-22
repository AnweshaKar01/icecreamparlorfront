import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
const IndividualItems = ({id, title,orderCount,price, onDelete}) => {
  const [addscoop,setAddscoop] = useState(orderCount);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  useEffect(()=>{
    async function updateItem(){
      const url = "http://localhost:5000/cart/updateCartItems";
      const data = {cartId: localStorage.getItem("cartId"), scoopName: title, quantityOrdered: addscoop};
      const updateRequest = await axios.put(url,data);
      if(updateRequest.status==200){
        console.log("updated quantity")
        setUpdatedPrice(updateRequest.data.price);
      }
    } 
    updateItem();
  },[addscoop]);
  const updateScoop = async(event) => {
    setAddscoop(event.target.value);
  }
  return (
    <Card>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography variant="h5">{title}</Typography>}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                50gm per scoop
                <br />
                <br />
                <FormControl fullWidth>
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
              </Typography>
              <br />
              <Typography variant="h6">
                Total Scoops: {addscoop}
                <br />
                Price : {updatedPrice}
              </Typography>
              <br />
            </Fragment>
          }
        />
        <IconButton onClick={()=>onDelete(id)}>
          <DeleteRoundedIcon fontSize="large" color="primary" />
        </IconButton>
      </ListItem>
    </Card>
  );
};
export default IndividualItems;
