import { Inline } from "../Inline";
import { Pad } from "../Pad";
import styled from "styled-components";
import { Logo } from "../Logo";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/slices/authorizationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const Menu = styled(Inline).attrs(() => ({
  as: Pad,
  padding: ["0.5rem", "1rem"],
  gutter: "1rem",
  justify: "start",
}))`
  //background: rgb(1, 95, 156);
  color: gray;
  color-scheme: dark;
  border-block-end: 1px solid rgb(229, 229, 229);
`;

const SearchBar = styled(Pad).attrs(() => ({
  as: "input",
  padding: ["0.5rem", "1rem"],
}))`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-radius: 0.3rem;
  border: none;
  color: gray;
  //background: rgb(1, 95, 156);
`;

export default function BarMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log(token);
  console.log(user)
  return (
    <Menu>
      <Logo size={"50px"} inverse={"white"}>
        <img
          style={{ width: "50px" }}
          src={require("../../assets/mingaz_logo_black.png")}
          alt={"logo"}
        />
      </Logo>
      <div>{user && user}</div>
      {token ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            dispatch(logOut());
          }}
        >
          Выйти
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Войти
        </Button>
      )}
    </Menu>
  );
}
