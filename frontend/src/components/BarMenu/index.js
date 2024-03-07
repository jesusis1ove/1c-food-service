import { Inline } from "../Inline";
import { Pad } from "../Pad";
import styled from "styled-components";
import { Logo } from "../Logo";

export const Menu = styled(Inline).attrs(() => ({
  as: Pad,
  padding: ["0.5rem", "1rem"],
  gutter: "1rem",
  justify: "start",
}))`
  background: rgb(1, 95, 156);
  color: white;
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
  color: white;
  background: rgb(1, 95, 156);
`;

export default function BarMenu() {
  return (
    <Menu>
      <Logo size={"50px"} inverse={"rgb(1, 95, 156)"}>
        <img
          style={{ width: "50px" }}
          src={require("../../assets/mingaz_logo_white.png")}
          alt={"logo"}
        />
      </Logo>
      <div>ФИО</div>
    </Menu>
  );
}
