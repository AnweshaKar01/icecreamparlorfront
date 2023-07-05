import { AccountCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import backImage from "../Assets/Images/SignUpImage.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUpSide() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    if (newUserResponse.status === 200) {
      console.log("user added: ", userData.userId);
      const emptyCartRequest = { userId: userData.userId, grandTotal: null };
      const newCartResponse = await axios.post(
        baseUrl + "cart/createCart",
        emptyCartRequest
      );
      const cartData = newCartResponse.data;
      if (newCartResponse.status === 200) {
        console.log("cart created: ", cartData.cartId);
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("name", userData.userName);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("cartId", cartData.cartId);
        console.log("forwarding to home....");
        navigate("/");
      } else {
        alert("some error occoured, please try again");
      }
    }
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
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
            Sign up
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
              id="userName"
              label="Name"
              name="userName"
              value={newUser.userName}
              onChange={handleChange}
              autoComplete="family-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailId"
              label="Email Address"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={newUser.password}
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
