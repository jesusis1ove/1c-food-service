import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slices/authorizationSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  console.log(token);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
