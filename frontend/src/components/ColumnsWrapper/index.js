import styled from "styled-components";

export const ColumnsWrapper = styled.div`
  display: grid;
  gap: ${(props) => props.gatter ?? "1rem"};
  align-items: center;
  grid-template-columns: repeat(${(props ) => props.columns}, 25%);
`;

export const Column = styled.div`
grid-column: span ${({ span = 1 }) => span};
`;
