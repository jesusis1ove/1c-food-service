import styled from "styled-components";
import { Center } from "../Center";

export const Button = styled(Center).attrs(() => ({
  as: "button",
}))`
  border-radius: 0.4rem;
  background-color: #015f9c;
  cursor: pointer;
  padding: 0.5rem 3rem;
  color: white;
  border: 3px solid transparent;
`;
