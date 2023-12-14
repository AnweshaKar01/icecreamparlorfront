import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useStateValue } from "../ContextApi/Context";
import Badge from "@mui/material/Badge";
import SearchItem from "./SearchItem";

function AdminNavBar({ navBarText, children, search, setSearch }) {
  const navigate = useNavigate();
  const [isLogggedIn, setIsLoggedIn] = useState(false);

  const [{ cart }, dispatch] = useStateValue();
  const Login = () => {
    navigate("/login");
  };

  //logout function
  const Logout = async () => {
    const url = `http://localhost:5000/users/logout/${localStorage.getItem(
      "userId"
    )}`;
    const request = await axios.delete(url);
    if (request.status === 200) {
      localStorage.clear();
      dispatch({
        type: "clearCart",
      });
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  //check logged in or not to switch the buttons
  React.useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("cartId")) {
      setIsLoggedIn(true);
    }
  }, []);
  const drawerWidth = 240;
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
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="fixed">
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
                <Link
                  key={index}
                  to={text.route}
                  style={{ textDecoration: "none" }}
                >
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
            sx={{
              flexGrow: 1,
              fontStyle: "italic",
              fontSizeAdjust: "inherit",
              position: "sticky",
            }}
            color="azure"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {navBarText}
            </Link>
          </Typography>
          <Box>
            <SearchItem search={search} setSearch={setSearch} />
          </Box>
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
        {children}
      </Box>
    </Box>
  );
}

export default AdminNavBar;
