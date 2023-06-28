import { createContext, useState } from "react";

const IcecreamContext = createContext();

const IcecreamContextProvider = ({ children }) => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [bill, setBill] = useState("");

  return (
    <IcecreamContext.Provider
      value={{ grandTotal, setGrandTotal, bill, setBill }}
    >
      {children}
    </IcecreamContext.Provider>
  );
};

export { IcecreamContextProvider, IcecreamContext };
