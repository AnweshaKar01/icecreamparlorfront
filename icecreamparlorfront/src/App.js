import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./Assets/Theme/Themes";
import Home from "./Home/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Cart from "./Cart/Cart";
import Bill from "./Cart/Bill";
import SignInSide from "./Login/SingInSide";
import SignUpSide from "./Login/SignUpSide";
import AllBills from "./Cart/AllBills";
import StockEntry from "./Admin/StockEntry";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: "/signup",
    element: <SignUpSide />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/bill",
    element: <AllBills />,
  },
  {
    path: "/bill/:billId",
    element: <Bill />,
  },
  {
    path: "/admin/stockEntry",
    element: <StockEntry />,
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
