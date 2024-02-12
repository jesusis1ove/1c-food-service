import styled from "styled-components";

export const ColumnsWrapper = styled.div`
  display: grid;
  gap: ${(props) => props.gatter ?? "1rem"};
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, fr);
`;

export const Column = styled.div`
grid-column: span ${({ span = 1 }) => span};
`;
