import { useEffect } from "react";
import GridItems from "../Components/GridItems";
import NavBar from "../Components/Navbar";
import { useStateValue } from "../ContextApi/Context";
import axios from "axios";
const Home = () => {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchCartItems = async () => {
      const getCartRequest = await axios.get(
        `http://localhost:5000/cart//getCartItems/${userId}`
      );
      if (getCartRequest.status === 200) {
        getCartRequest.data.allscoops.map((scoop) => {
          return dispatch({
            type: "add2Cart",
            data: scoop.invItemId,
          });
        });
      }
    };
    if (userId !== null) {
      fetchCartItems();
    }
  }, []);
  return (
    <NavBar navBarText={"FlavourEats"}>
      <GridItems />
    </NavBar>
  );
};

export default Home;
