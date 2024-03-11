import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import RequireAuth from "./utils/requireAuth";
import Layout from "./components/Layout";
import Menu from "./content/menu";
import Orders from "./content/orders";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout />} />
            <Route path={"login"} element={<App />} />
            <Route path={"menu"} element={<Menu />} />
            <Route path={"/orders"} element={<Orders />} />
            <Route element={<RequireAuth />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
