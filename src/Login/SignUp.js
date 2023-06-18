import React from "react";
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
const SignUp = () => {
  const loginPage = useNavigate();
  const Login = () => {
    loginPage("/login");
  };
  const homePage = useNavigate();
  const Home = () => {
    homePage("/");
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
        textAlign: "center",
        alignSelf: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Card
        sx={{ minWidth: 275, marginTop: 10, marginLeft: 41, maxWidth: 700 }}
        elevation={14}
      >
        <IconButton onClick={() => Home()} sx={{ textAlign: "right" }}>
          <CancelIcon color="warning" />
        </IconButton>
        <CardHeader title="Enter Your Details" />

        <CardContent>
          <TextField
            required
            id="outlined-required"
            label="Enter Your Name"
            defaultValue="ABC XYZ"
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Enter Your Email"
            defaultValue="abc@gmail.com"
          />
          <br />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <br />
          <Button
            onClick={() => Login()}
            variant="contained"
            color="success"
            sx={{ backgroundColor: "tomato" }}
          >
            Sign Up
          </Button>
          <br />
          <Link>Have an account? Login</Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
