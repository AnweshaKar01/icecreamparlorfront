import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect } from "react";
 import image from "../Assets/Images/IceCreamImage.webp";
import ItemCard from "./ItemCard";
import axios from "axios";
import {data} from "../Data/ScoopDetails";
const GridItems = () => {
return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={1}>
        {data === [] ? (
          <Grid
            container
            md={3}
            xs={12}
            sx={{ justifyContent: "center", marginBottom: 1 }}
          >
            <Typography>No Data Available</Typography>
          </Grid>
        ) : (
          data.map((flavor) => (
            <Grid
              container
              md={3}
              xs={12}
              sx={{ justifyContent: "center", marginBottom: 1 }}
              key={flavor.id}
            >
              <ItemCard
                title={flavor.title}
                price={flavor.price}
                
                image={image}
                amountServed={flavor.amountServed}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default GridItems;