import styled from "styled-components";

export const MediaWrapper = styled.div`
  position: relative;
  --n: ${(props) => (props.ratio ? props.ratio[0] : 1)};
  --d: ${(props) => (props.ratio ? props.ratio[0] : 1)};
  ${(props) =>
    props.ratio &&
    ` aspect-ratio: var(--n) / var(--d);
  @supports not (aspect-ratio: 1/1) {
    padding-bottom: calc(var(--d) / var(--n) * 100%);
  }`}
  > * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
