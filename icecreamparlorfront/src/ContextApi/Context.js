import { createContext, useContext, useReducer } from "react";

const IcecreamContext = createContext();

const IcecreamContextProvider = ({ reducer, initialState, children }) => {
  return (
    <IcecreamContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </IcecreamContext.Provider>
  );
};
const useStateValue = () => useContext(IcecreamContext);
export { IcecreamContext, IcecreamContextProvider, useStateValue };
