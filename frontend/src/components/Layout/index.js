import { Outlet } from "react-router-dom";
import BarMenu from "../BarMenu";

export default function Layout() {
  return (
    <div className="App">
      <BarMenu />
      <Outlet />
    </div>
  );
}
