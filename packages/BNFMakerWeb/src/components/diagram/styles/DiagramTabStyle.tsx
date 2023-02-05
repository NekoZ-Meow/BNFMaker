import styled from "styled-components";

import { FontColor } from "../../../constants/FontColor";
import { FontFamily } from "../../../constants/FontFamily";

/**
 * 構文図式を切り替えるタブ
 */
export const DiagramTabDiv = styled.div<{
    fontSizePx: number;
    borderColor: string;
    backGroundColor: string;
    widthPx: number;
    maxWidthPx: number;
}>`
    flex-shrink: 1000;
    font-size: ${({ fontSizePx }) => fontSizePx}px;
    width: ${({ widthPx }) => widthPx}px;
    max-width: ${({ maxWidthPx }) => maxWidthPx}px;
    border-color: ${({ borderColor }) => borderColor};
    height: 100%;
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    background-color: ${({ backGroundColor }) => backGroundColor};
    padding: 0px 4px;
`;

/**
 * 構文図式の名前入力欄
 */
export const DiagramNameInput = styled.input<{
    backGroundColor: string;
}>`
    text-align: center;
    width: 100%;
    background-color: ${({ backGroundColor }) => backGroundColor};
    border: none;
    outline: none;
    overflow: scroll;
    font-family: ${FontFamily.primary};
    color: ${FontColor.primary};
`;
