/**
 * グラフを書く際のノードにあたる部分のスタイル
 */

import styled from "styled-components";

import { FontColor } from "../../../constants/FontColor";
import { FontFamily } from "../../../constants/FontFamily";

export const DiagramElementInput = styled.input<{
    width: number;
    height: number;
    fontSizePx: number;
    backGroundColor: string;
}>`
    text-align: center;
    font-size: ${({ fontSizePx }) => fontSizePx}px;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background-color: ${({ backGroundColor }) => backGroundColor};
    border: none;
    outline: none;
    font-family: ${FontFamily.primary};
    color: ${FontColor.primary};
`;
