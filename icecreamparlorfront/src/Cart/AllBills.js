import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const AllBills = () => {
  const [allBills, setAllBills] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBills = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userId"),
      };
      const getAllBillsResponse = await axios.get(
        "http://localhost:5000/bill/getAll",
        { headers }
      );
      if (getAllBillsResponse.status === 200) {
        setAllBills(getAllBillsResponse.data);
      } else {
        alert("You have not purchased anything");
      }
    };
    if (
      localStorage.getItem("userId") === null &&
      localStorage.getItem("cartId") === null
    ) {
      navigate("/login");
    } else {
      fetchAllBills();
    }
  }, []);
  const getDT = (timeStamp) => {
    const datetime = new Date(timeStamp);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = datetime.getDate();
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  };
  return (
    <NavBar navBarText={"FlavourEats"}>
      {allBills.length === 0 ? (
        <Typography variant="h6">Fetching Data...</Typography>
      ) : (
        <Fragment>
          <Typography variant="h3" sx={{ m: 2 }}>
            All Orders
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">Bill ID</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Time</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Items Purchased</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Link</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBills.map((bill) => (
                  <TableRow
                    key={bill.billId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {bill.billId}
                    </TableCell>
                    <TableCell align="center">
                      {getDT(bill.date).date}
                    </TableCell>
                    <TableCell align="center">
                      {getDT(bill.date).time}
                    </TableCell>
                    <TableCell align="center">
                      {bill.allscoops.length}
                    </TableCell>
                    <TableCell align="center">{bill.grandTotal}</TableCell>
                    <TableCell align="center">
                      <Link href={`/bill/${bill.billId}`}>
                        <Button
                          variant="contained"
                          disableElevation
                          endIcon={<KeyboardArrowRightIcon />}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </NavBar>
  );
};

export default AllBills;
