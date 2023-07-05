import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import image from "../Assets/Images/flavors/Vanilla.webp";
import ItemCard from "./ItemCard";
import axios from "axios";
const GridItems = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchItems() {
      try {
        const url = "http://localhost:5000/inventory/getScoops";
        const response = await axios.get(url);
        setData(response.data);
      } catch (e) {
        console.error("Error occurred fetching data:", e);
        setData([]);
      }
    }
    fetchItems();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {data.length === 0 ? (
          <Grid
            container
            md={3}
            xs={12}
            sx={{ justifyContent: "center", marginBottom: 1 }}
          >
            <Typography>No Data Available</Typography>
          </Grid>
        ) : (
          data.map((icecream) => (
            <Grid
              container
              md={4}
              xs={12}
              sx={{ justifyContent: "center", marginBottom: 1 }}
              key={icecream.scoopsId}
            >
              <ItemCard
                title={icecream.title}
                price={icecream.price}
                id={icecream.scoopsId}
                image={image}
                amountServed={"50gm per scoop"}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default GridItems;
