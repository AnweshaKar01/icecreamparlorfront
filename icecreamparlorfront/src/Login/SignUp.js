import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import backImage from "../Assets/Images/SignUpImage.jpg";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const signpUser = async () => {
    if (
      newUser.name === "" ||
      newUser.email === "" ||
      newUser.password === ""
    ) {
      window.alert("Please fill all fields properly");
      return;
    }
    const baseUrl = "http://localhost:5000/";
    const newUserResponse = await axios.post(baseUrl + "users/add", newUser);
    const userData = newUserResponse.data;
    if (newUserResponse.status == 200) {
      console.log("user added: ", userData.userId);
      const emptyCartRequest = { userId: userData.userId, grandTotal: null };
      const newCartResponse = await axios.post(
        baseUrl + "cart/create-cart",
        emptyCartRequest
      );
      const cartData = newCartResponse.data;
      if (newCartResponse.status == 200) {
        console.log("cart created: ", cartData.cartId);
        // setUserId(userData.userId);
        // setCartId(cartData.cartId);
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("cartId", cartData.cartId);
        console.log("forwarding to home....");
        navigate("/");
      } else {
        alert("some error occoured, please try again");
      }
    }
  };

  const changeHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <Box
      component="div"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
        textAlign: "center",
        alignSelf: "center",
        backgroundImage: `url(${backImage})`,
        backgroundSize: "clip",
        backgroundRepeat: "no-repeat",
        padding: 2.5,
      }}
    >
      <Card
        sx={{ minWidth: 275, marginTop: 10, marginLeft: 41, maxWidth: 700 }}
        elevation={14}
      >
        <IconButton onClick={() => navigate("/")} sx={{ textAlign: "right" }}>
          <CancelIcon color="warning" />
        </IconButton>
        <CardHeader title="Enter Your Details" />

        <CardContent>
          <TextField
            required
            id="outlined-required"
            label="Enter Your Name"
            type="text"
            name="userName"
            value={newUser.userName}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            id="outlined-required-email"
            label="Enter Your Email"
            name="email"
            type="email"
            value={newUser.email}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={newUser.password}
            onChange={changeHandler}
          />
          <br />
          <Button
            onClick={signpUser}
            type="submit"
            variant="contained"
            color="success"
            sx={{ backgroundColor: "tomato" }}
          >
            Sign Up
          </Button>
          <br />
          <Link to="/login">Have an account? Login</Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
