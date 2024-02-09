import styled from "styled-components";
import { fractions } from "../../utils/const/style";

export const Split = styled.div`
    display: grid;
    align-items: ${(props) => props.align ?? "center"};
    gap${(props) => props.gatter ?? "1rem"};
    grid-template-columns: ${({ fraction }) => fractions[fraction] ?? fractions["1/2"]};
`;
