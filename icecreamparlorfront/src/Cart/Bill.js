import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/Navbar";
const Bill = () => {
  const [currentBill, setCurrentBill] = useState({});
  //useParams used to accept the dynamic value of the path variable
  const { billId } = useParams();
  useEffect(() => {
    async function fetchBill() {
      const billRequest = await axios.get(
        `http://localhost:5000/bill/get/${billId}`
      );
      if (billRequest.status === 200) {
        setCurrentBill(billRequest.data);
      }
    }
    fetchBill();
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
    <NavBar navBarText={"Thank You! Visit Again!"}>
      {Object.keys(currentBill).length === 0 ? (
        <Typography>Fetching Data</Typography>
      ) : (
        <Fragment>
          <Card>
            <CardHeader title="Bill" subheader={"#" + currentBill.billId} />
            <CardContent>
              <Typography variant="h5">Name: {currentBill.userName}</Typography>
              <Typography variant="h6">
                Billing Date: {getDT(currentBill.date).date}
              </Typography>
              <Typography variant="h6">
                Billing Time: {getDT(currentBill.date).time}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Amount Paid:&nbsp;
                <strong>&#8377;{currentBill.grandTotal}</strong>
                <TaskAltIcon color="primary" />
              </Typography>
              <Typography variant="h5">Items brought</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="h6">#ID</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">Flavour</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">Quantity</Typography>
                        <Typography variant="body2">
                          (50gms per serving)
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">Price</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentBill.allscoops.map((scoop) => (
                      <TableRow
                        key={scoop.scoopsId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {scoop.scoopsId}
                        </TableCell>
                        <TableCell align="center">{scoop.scoopName}</TableCell>
                        <TableCell align="center">
                          {scoop.quantityOrdered}
                        </TableCell>
                        <TableCell align="center">
                          &#8377;{scoop.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
        </Fragment>
      )}
    </NavBar>
  );
};
export default Bill;
