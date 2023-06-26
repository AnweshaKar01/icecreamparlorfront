import { createContext, useState } from "react";

const IcecreamContext = createContext();

const IcecreamContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [cartId, setCartId] = useState("");

  return (
    <IcecreamContext.Provider value={{ userId, setUserId, cartId, setCartId }}>
      {children}
    </IcecreamContext.Provider>
  );
};

export { IcecreamContextProvider, IcecreamContext };
