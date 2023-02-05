import React, { useRef } from "react";
import { useRecoilValue } from "recoil";

import { useElementSize } from "../../hooks/useElementSize";
import { CurrentDiagramIdAtom } from "../../recoil/diagram-editor/DiagramEditorState";
import { GetAllDiagramIdsSelector } from "../../recoil/diagram/DiagramState";
import { GlobalThemeAtom } from "../../recoil/theme/GlobalTheme";
import { SelectToolbarThemeAtom } from "../../recoil/theme/ToolbarTheme";
import { RowFlexBox } from "../../styles/flex-box/RowFlexBox";
import { CreateDiagramButton } from "../buttons/diagram/CreateDiagramButton";
import { DiagramTab } from "../diagram/DiagramTab";

/**
 * 編集する構文図式を選択するためのツールバー
 */
export const DiagramSelectToolbar = React.memo(() => {
    const currentDiagramId = useRecoilValue(CurrentDiagramIdAtom);
    const syntaxDiagramIds = useRecoilValue(GetAllDiagramIdsSelector);
    const toolbarStyle = useRecoilValue(SelectToolbarThemeAtom);
    const { borderColor } = useRecoilValue(GlobalThemeAtom);
    const boxRef = useRef(null);
    const size = useElementSize(boxRef);
    return (
        <RowFlexBox
            ref={boxRef}
            style={{
                backgroundColor: toolbarStyle.backGroundColor,
                borderTop: `2px solid ${borderColor}`,
                flexBasis: `${toolbarStyle.heightPx}px`,
                height: `${toolbarStyle.heightPx}px`,
            }}
        >
            {syntaxDiagramIds.map((diagramId) => {
                return (
                    <DiagramTab
                        widthPx={size.x / syntaxDiagramIds.length}
                        diagramId={diagramId}
                        isSelected={diagramId === currentDiagramId}
                        key={`Tab:${diagramId}`}
                    ></DiagramTab>
                );
            })}
            <CreateDiagramButton></CreateDiagramButton>
        </RowFlexBox>
    );
});
