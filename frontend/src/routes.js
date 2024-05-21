import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import Login from "./content/login";
import RequireAuth from "./utils/requireAuth";
import Menu from "./content/menu";
import Orders from "./content/orders";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/slices/authorizationSlice";
import { Logo } from "./components/Logo";

export default function Routers() {
  const token = useSelector(selectCurrentToken);
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={token ? <App /> : <Login />} />
        {/*<Route path={""} element={<Login />} />*/}

        <Route element={<RequireAuth />}>
          <Route path={"menu"} element={<Menu />} />
          <Route path={"orders"} element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
}
