import styled from "styled-components";
export const Pad = styled.div`
  padding: ${(props) => {
    return []
      .concat(props.padding)
      .map((paddingKey) => paddingKey)
      .join(" ");
  }};
  margin: ${(props) => {
    return []
      .concat(props.margin)
      .map((marginKey) => marginKey)
      .join(" ");
  }};
`;
