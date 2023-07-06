export default function reducer(state, action) {
  switch (action.type) {
    case "add2Cart":
      // this is done to remove duplicate entries that may occur
      // because of re-rendering
      if (state.cart.includes(action.data) === false) {
        return {
          ...state,
          cart: [...state.cart, action.data],
        };
      } else {
        return state;
      }

    case "removefromCart":
      const newCart = state.cart.filter((scoopsId) => scoopsId !== action.data);
      return { ...state, cart: newCart };
    default:
      return state;
  }
}
