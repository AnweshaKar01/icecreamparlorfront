import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IcecreamContextProvider } from "./ContextApi/Context";
import { initialState } from "./ContextApi/InitialState";
import reducer from "./ContextApi/Reducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IcecreamContextProvider initialState={initialState} reducer={reducer}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IcecreamContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
