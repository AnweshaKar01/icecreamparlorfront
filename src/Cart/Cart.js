import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Avatar,
  Card,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { IcecreamContext} from "../ContextApi/Context";
function Cart(props) {
  const BillPage = useNavigate();
  const Bill = () => {
    BillPage("/bill");
  };
  const [addscoop, setAddscoop] = React.useState("");
  const {cartItems} = React.useContext(IcecreamContext);
  const handleChange = (event) => {
    setAddscoop(event.target.value);
  };
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
            Welcome User!
          </Typography>

          <Box>
            <Button
              onClick={() => Bill()}
              variant="filled"
              startIcon={<ShoppingBasketRoundedIcon />}
              color="#000000"
              sx={{ backgroundColor: "#ffffff" }}
            >
              Order
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

          <Divider variant="inset" component="li" />
        </List>
      </Box>
    </Box>
  );
}

export default Cart;
