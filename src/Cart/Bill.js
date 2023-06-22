import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
  List,
  ListItem,
  Card,
  ListItemText,
  Container,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContactEmergency } from "@mui/icons-material";
const Bill = () => {
  const homePage = useNavigate();
  const Home = () => {
    homePage("/");
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
            <Button
              onClick={() => Home()}
              variant="filled"
              startIcon={<LogoutIcon />}
              color="#000000"
              sx={{ backgroundColor: "#ffffff" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 3, pl: 1, pr: 1, flexGrow: 1 }}>
        <Toolbar />

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Card>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h5">Vanilla Moon</Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>

                    <Container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">Total Scoops: 4</Typography>
                      <Typography variant="h6">Price : 100</Typography>
                    </Container>
                    <br />
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Card>
        </List>
      </Box>
    </Box>
  );
};
export default Bill;
