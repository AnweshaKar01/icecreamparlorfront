import React from "react";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function NavBar(props) {
  const loginPage = useNavigate();
  const Login = () => {
    loginPage("/login");
  };
  const drawerWidth = 240;
  // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  //   ({ theme, open }) => ({
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: `-${drawerWidth}px`,
  //     ...(open && {
  //       transition: theme.transitions.create('margin', {
  //         easing: theme.transitions.easing.easeOut,
  //         duration: theme.transitions.duration.enteringScreen,
  //       }),
  //       marginLeft: 0,
  //     }),
  //   }),
  // );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <List>
              {[
                { item: "Home", route: "/" },
                { item: "About", route: "/about" },
                { item: "Contact", route: "/contact" },
              ].map((text, index) => (
                <Link to={text.route} style={{ textDecoration: "none" }}>
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text.item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>

          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "italic", fontSizeAdjust: "inherit" }}
            color="azure"
          >
            FlavorEats
          </Typography>
          <Box>
            <IconButton>
              <ShoppingCartCheckoutTwoToneIcon fontSize="large" color="white" />
            </IconButton>
          </Box>
          {/* <Fab variant="extended" size="small" color="primary" > */}
          <Box>
            {" "}
            <Button
              onClick={() => Login()}
              variant="filled"
              startIcon={<LoginIcon />}
              color="#000000"
              sx={{ backgroundColor: "#ffffff" }}
            >
              Login
            </Button>
          </Box>
          {/* </Fab> */}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 3, pl: 1, pr: 1, flexGrow: 1 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default NavBar;
