import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { DiagramTabData } from "../../constants/DataTransferFormat";
import { useCommandDo } from "../../features/command/useCommand";
import { useClick } from "../../hooks/useClick";
import { useDrag } from "../../hooks/useDrag";
import { DiagramNameSelectorFamily } from "../../recoil/diagram/DiagramState";
import { GlobalThemeAtom } from "../../recoil/theme/GlobalTheme";
import { SelectToolbarThemeAtom } from "../../recoil/theme/ToolbarTheme";
import { CenterDiv } from "../../styles/Alignment";
import { useDiagramTabMenu } from "../context-menu/hooks/useDiagramTabMenu";
import { useSelectDiagramCommand } from "../diagram-editor/hooks/commands/useSelectDiagramCommand";
import { useSetDiagramNameCommand } from "./hooks/commands/useSetDiagramNameCommand";
import { DiagramNameInput, DiagramTabDiv } from "./styles/DiagramTabStyle";

/**
 * 構文図式を選択するためのタブ
 */
export const DiagramTab: React.FC<{
    diagramId: string;
    isSelected: boolean;
    widthPx: number;
}> = React.memo(({ diagramId, isSelected, widthPx }) => {
    const { borderColor } = useRecoilValue(GlobalThemeAtom);
    const toolbarStyle = useRecoilValue(SelectToolbarThemeAtom);
    const tabRef = useRef(null);
    const inputRef = useRef(null);
    const diagramName = useRecoilValue(DiagramNameSelectorFamily(diagramId));
    const commandDo = useCommandDo();
    const selectDiagramCommand = useSelectDiagramCommand();
    const setDiagramNameCommand = useSetDiagramNameCommand();
    const { open, menuElement } = useDiagramTabMenu(diagramId);
    const backGroundColor = isSelected
        ? toolbarStyle.selectedTabColor
        : toolbarStyle.backGroundColor;

    /**
     * 左クリックをした時、構文図式を切り替える
     */
    const onMouseLeftClick = async (event) => {
        commandDo(await selectDiagramCommand(diagramId));
    };

    /**
     * 右クリックをした時、メニューを表示
     */
    const onMouseRightClick = (event: MouseEvent) => {
        open(event.pageX, event.pageY);
    };

    /**
     * クリックの処理を使用する
     */
    useClick(tabRef, {
        onMouseLeftClick,
        onMouseRightClick,
    });

    /**
     * ドラッグが開始した時の処理
     */
    const onDragStart = (event: DragEvent) => {
        const dataTransfer = event.dataTransfer;
        if (dataTransfer === null) return;
        dataTransfer.effectAllowed = "copyMove";
        dataTransfer.clearData(DiagramTabData);
        dataTransfer.setData(DiagramTabData, diagramId);
    };

    /**
     * ドラッグ処理を使用する
     */
    useDrag(tabRef, { onDragStart });

    /**
     * 名前が変更された時、入力欄も変更する
     */
    useEffect(() => {
        inputRef.current.value = diagramName;
    }, [diagramName]);

    return (
        <DiagramTabDiv
            fontSizePx={toolbarStyle.heightPx / 4}
            borderColor={borderColor}
            widthPx={widthPx}
            maxWidthPx={toolbarStyle.maxTabWidthPx}
            backGroundColor={backGroundColor}
            ref={tabRef}
            draggable={true}
            onDragStart={(event) => console.log(event)}
        >
            <CenterDiv>
                <DiagramNameInput
                    ref={inputRef}
                    backGroundColor={backGroundColor}
                    onChange={async (event) => {
                        event.preventDefault();
                        commandDo(await setDiagramNameCommand(diagramId, event.target.value));
                    }}
                ></DiagramNameInput>
            </CenterDiv>
            {menuElement}
        </DiagramTabDiv>
    );
});
