import styled from "styled-components";
import { InlineBundle } from "../InlineBundle";

const stretchSchema = {
  all: `> * { flex: 1 }`,
  start: `> :first-child { flex: 1 }`,
  end: `> :last-child { flex: 1 }`,
};
export const Inline = styled(InlineBundle)`
  flex-wrap: nowrap;
  ${({ stretch }) => {
    if (typeof stretch === "number") {
      return `> :nth-child(${stretch + 1}) { flex: 1 }`;
    }
    return stretchSchema[stretch] ?? "";
  }}
`;
