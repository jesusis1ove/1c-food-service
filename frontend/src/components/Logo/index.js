import styled from "styled-components";

export const Logo = styled.div`
  background: ${(props) => props.inverse ?? "white"};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  ${(props) => !props.square && "border-radius:50%"}
`;
