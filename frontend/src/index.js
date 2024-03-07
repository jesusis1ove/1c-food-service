import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./content/orders";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RequireAuth from "./utils/requireAuth";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />} />
          <Route path={"login"} element={<App />} />
          <Route path={"/orders"} element={<Orders />} />
          <Route element={<RequireAuth />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
