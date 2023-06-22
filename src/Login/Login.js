import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import backImage from "../Assets/Images/Login_SignUp_BackGround.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const homePage = useNavigate();
  const Home = async () => {
    if (email === "" || password === "") {
      window.alert("Enter all fields!!");
      return;
    } else {
      const url = "http://localhost:5000/users/login";
      const data = { emailId: email, password: password };
      const request = await axios.post(url, data);
      if (request.status == 200) {
        localStorage.setItem("userId", request.data);
        const cartUrl = `http://localhost:5000/cart/getCartItems/${request.data}`;
        const cartRequest = await axios.get(cartUrl);
        if (cartRequest.status == 200) {
          localStorage.setItem("cartId", cartRequest.data.cartId);
          homePage("/");
        }
      } else {
        alert("could not login please try again");
      }
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${backImage})`,
        backgroundSize: "clip",
        backgroundRepeat: "no-repeat",
        padding: 2.7,
      }}
    >
      <Grid container xs={12}>
        <Card
          sx={{ minWidth: 600, marginLeft: 42, marginTop: 20 }}
          elevation={10}
        >
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { m: 1, height: 100 },
              textAlign: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <CardHeader
              title="Enter Your Login Credentials"
              sx={{ fontSize: "20" }}
            />

            <CardContent>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Email"
                defaultValue="abc@gmail.com"
                type="email"
                value={email}
                onChange={emailChangeHandler}
              />
              <br />

              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={passwordChangeHandler}
              />
              <br />
              <Button
                onClick={() => Home()}
                variant="contained"
                color="success"
                sx={{ backgroundColor: "tomato" }}
              >
                Login
              </Button>
            </CardContent>

            <Link to="/signup">{"Not Registered? Sign Up"}</Link>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
};

export default Login;
