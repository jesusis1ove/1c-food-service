import styled from "styled-components";

const justifySchema = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};
export const InlineBundle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.gutter};
  justify-content: ${(props) =>
    justifySchema[props.justify] ?? justifySchema["end"]};
  align-items: ${(props) =>
    justifySchema[props.align] ?? justifySchema["center"]};
`;
