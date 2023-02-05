import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";

import { FontColor } from "../../constants/FontColor";
import { FontFamily } from "../../constants/FontFamily";
import { CurrentDiagramIdAtom } from "../../recoil/diagram-editor/DiagramEditorState";
import { GetASTSelectorFamily } from "../../recoil/result-view/ResultViewRecoil";
import { GlobalThemeAtom } from "../../recoil/theme/GlobalTheme";
import { ResultViewThemeAtom } from "../../recoil/theme/ResultViewTheme";
import { LeftDiv } from "../../styles/Alignment";
import { EBNFCardDivStyle } from "../../styles/result-view/EBNFCardDiv";

const EBNFCardDiv: React.FC<{
    children: ReactNode;
    isSelected: boolean;
}> = React.memo(({ children, isSelected }) => {
    const globalTheme = useRecoilValue(GlobalThemeAtom);
    const resultViewTheme = useRecoilValue(ResultViewThemeAtom);
    const borderColor = isSelected
        ? resultViewTheme.currentCardBorderColor
        : globalTheme.borderColor;
    const borderWidth = isSelected ? "1px" : "0px 0px 1px 0px";

    return (
        <EBNFCardDivStyle
            draggable={false}
            heightPx={resultViewTheme.cardHeight}
            borderColor={borderColor}
            borderWidth={borderWidth}
        >
            {children}
        </EBNFCardDivStyle>
    );
});

/**
 * 一つの構文図式のEBNFを表示するコンポーネント
 */
export const EBNFResultCard: React.FC<{ diagramId: string }> = React.memo(({ diagramId }) => {
    const currentDiagramId = useRecoilValue(CurrentDiagramIdAtom);
    const anAST = useRecoilValue(GetASTSelectorFamily(diagramId));
    const resultString = anAST === null ? "" : anAST.toEBNF();

    return (
        <EBNFCardDiv isSelected={currentDiagramId === diagramId}>
            <LeftDiv>
                <pre
                    style={{
                        overflowX: "scroll",
                        overflowY: "visible",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "20px",
                        height: "max-content",
                        fontFamily: FontFamily.primary,
                        color: FontColor.primary,
                    }}
                >
                    {resultString}
                </pre>
            </LeftDiv>
        </EBNFCardDiv>
    );
});
