import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./content/orders";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<App />} />
          <Route path={"/orders"} element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
