import styled from "styled-components";
export const Center = styled.div`
  box-sizing: content-box;
  margin-inline-start: auto;
  margin-inline-end: auto;
  max-inline-size: ${(props) => props.maxWidth};
  ${(props) => props.centerText && `text-align:center`}
`;
