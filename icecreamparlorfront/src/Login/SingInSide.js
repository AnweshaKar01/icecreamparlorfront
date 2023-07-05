import { AccountCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import backImage from "../Assets/Images/Login_SignUp_BackGround.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignInSide() {
  const [data, setData] = useState({ emailId: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.email === "" || data.password === "") {
      window.alert("Enter all fields!!");
      return;
    } else {
      const url = "http://localhost:5000/users/login";
      try {
        const request = await axios.post(url, data);
        if (request.status === 200) {
          localStorage.setItem("userId", request.data.userId);
          localStorage.setItem("name", request.data.userName);
          localStorage.setItem("userRole", request.data.role);
          const cartUrl = `http://localhost:5000/cart/getCartItems/${request.data.userId}`;
          const cartRequest = await axios.get(cartUrl);
          if (cartRequest.status === 200) {
            localStorage.setItem("cartId", cartRequest.data.cartId);
            navigate("/");
          }
        } else {
          alert("could not login please try again");
        }
      } catch (err) {
        alert("email/password wrong");
        console.error("could not login: ", err);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sizes="large" sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountCircle fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailId"
              label="Email Address"
              name="emailId"
              value={data.emailId}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
