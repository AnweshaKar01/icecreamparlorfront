import { useEffect } from "react";
import GridItems from "../Components/GridItems";
import NavBar from "../Components/Navbar";
import { useStateValue } from "../ContextApi/Context";
import axios from "axios";
const Home = () => {
  //useStatevalue returns an array in which 0th index= current data (not used so not stored) and
  //1st index= dispatch function to update the state
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchCartItems = async () => {
      const getCartRequest = await axios.get(
        `http://localhost:5000/cart/getCartItems/${userId}`
      );
      if (getCartRequest.status === 200) {
        //traverse and map data of allscoops and send the inventory id
        //of all the scoops to the cart array ;addition is done in reducer.js
        //using react context api stored in useStatevalue()
        getCartRequest.data.allscoops.map((scoop) => {
          return dispatch({
            type: "add2Cart",
            data: scoop.invItemId,
          });
        });
      }
    };
    //1. check login ; if logged in fetch cart items by calling fetchCartitems
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
