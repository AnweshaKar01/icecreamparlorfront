import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IcecreamContext } from "../ContextApi/Context";
const Bill = () => {
  const navigate = useNavigate();
  const [isLogggedIn, setIsLoggedIn] = useState(false);
  const Home = () => {
    navigate("/");
  };
  const Login = () => {
    navigate("/login");
  };
  const Logout = async () => {
    const url = `http://localhost:5000/users/logout/${localStorage.getItem(
      "userId"
    )}`;
    const request = await axios.delete(url);
    if (request.status === 200) {
      localStorage.clear();
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("cartId")) {
      setIsLoggedIn(true);
    }
  }, []);
  const { grandTotal, setGrandTotal, bill, setBill } =
    useContext(IcecreamContext);
  const getDT = (timeStamp) => {
    const datetime = new Date(timeStamp);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = datetime.getDate();
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();
    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
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
            Thank You! Visit Again!
          </Typography>

          <Box>
            {isLogggedIn ? (
              <Button
                onClick={() => Logout()}
                variant="filled"
                startIcon={<LogoutIcon />}
                color="#000000"
                sx={{ backgroundColor: "#ffffff" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => Login()}
                variant="filled"
                startIcon={<LoginIcon />}
                color="#000000"
                sx={{ backgroundColor: "#ffffff" }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 3, pl: 1, pr: 1, flexGrow: 1 }}>
        <Toolbar />
        {console.log("Bill: ", bill)}
        <Card>
          <CardHeader title="Bill" subheader={"#" + bill.billId} />
          <CardContent>
            <Typography variant="h5">Name: {bill.userName}</Typography>
            <Typography variant="h6">
              Billing Date: {getDT(bill.date).date}&nbsp;
              {getDT(bill.date).time}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Total Amount Paid:&nbsp;<strong>&#8377;{bill.grandTotal}</strong>
              <TaskAltIcon color="primary" />
            </Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Bill;
