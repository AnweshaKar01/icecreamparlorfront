import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import backImage from "../Assets/Images/Login_SignUp_BackGround.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const homePage = useNavigate();
  const Home = () => {
    homePage("/");
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
            component="form"
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
