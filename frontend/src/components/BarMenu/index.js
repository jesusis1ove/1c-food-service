import { Inline } from "../Inline";
import { Pad } from "../Pad";
import styled from "styled-components";
import { Logo } from "../Logo";

export const Menu = styled(Inline).attrs(() => ({
  as: Pad,
  padding: ["0.5rem", "1rem"],
  gutter: "1rem",
  align: "center",
  justify: "center",
}))`
  background: rgb(1, 95, 156);
  color: white;
  border-block-end: 1px solid rgb(229, 229, 229);
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
    </Menu>
  );
}
