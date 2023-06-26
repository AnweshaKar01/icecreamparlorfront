import { createContext, useState } from "react";

const IcecreamContext = createContext();

const IcecreamContextProvider = ({ children }) => {
  const [grandTotal, setGrandTotal] = useState(0);

  return (
    <IcecreamContext.Provider value={{ grandTotal, setGrandTotal }}>
      {children}
    </IcecreamContext.Provider>
  );
};

export { IcecreamContextProvider, IcecreamContext };
