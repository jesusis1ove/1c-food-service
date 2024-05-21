import { useSelector } from "react-redux";
import {selectCurrentToken} from "../redux/slices/authorizationSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}
