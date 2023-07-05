export default function reducer(state, action) {
  switch (action.type) {
    case "add2Cart":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    default:
      return state;
  }
}
