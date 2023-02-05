import styled from "styled-components";

export const EBNFCardDivStyle = styled.div<{
    heightPx: number;
    borderColor: string;
    borderWidth: string;
}>`
    border-color: ${({ borderColor }) => borderColor};
    border-width: ${({ borderWidth }) => borderWidth};
    border-style: solid;
    height: ${({ heightPx }) => heightPx}px;
    width: 100%;
`;
