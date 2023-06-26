import { useEffect, useContext } from "react";
import NavBar from "../Components/Navbar";
import GridItems from "../Components/GridItems";
import { IcecreamContext } from "../ContextApi/Context";
const Home = () => {
  return (
    <NavBar>
      <GridItems />
    </NavBar>
  );
};

export default Home;
