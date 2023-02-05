import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { CurrentDiagramIdAtom } from "../../recoil/diagram-editor/DiagramEditorState";
import { ColumnFlexBox } from "../../styles/flex-box/ColumnFlexBox";
import { Diagram } from "../diagram/Diagram";
import { useCreateDiagramCommand } from "../diagram/hooks/commands/useCreateDiagramCommand";
import { BooleanSelector } from "../selector/BooleanSelector";
import { DiagramControlToolbar } from "../toolbar/DiagramControlToolbar";
import { DiagramSelectToolbar } from "../toolbar/DiagramSelectToolbar";
import { useDiagramEditorControl } from "./hooks/useDiagramEditorControl";
import { NoDiagramMessage } from "./NoDiagramMessage";

/**
 * 構文図式を書くための領域
 */
export const DiagramEditor = React.memo(() => {
    const currentDiagramId = useRecoilValue(CurrentDiagramIdAtom);
    const divRef = useRef(null);
    const createDiagramCommand = useCreateDiagramCommand();
    const setCurrentDiagram = useSetRecoilState(CurrentDiagramIdAtom);
    useDiagramEditorControl(divRef);

    /**
     * アプリケーション開始時に図を1つ作成する
     */
    useEffect(() => {
        const anId = createDiagramCommand("aStatement").execute();
        setCurrentDiagram(anId);
    }, [createDiagramCommand, setCurrentDiagram]);

    return (
        <ColumnFlexBox>
            <DiagramControlToolbar></DiagramControlToolbar>
            <div ref={divRef} style={{ width: "100%", height: "100%", position: "relative" }}>
                <BooleanSelector
                    value={currentDiagramId !== ""}
                    onTrue={<Diagram diagramId={currentDiagramId} key={currentDiagramId}></Diagram>}
                    onFalse={<NoDiagramMessage></NoDiagramMessage>}
                ></BooleanSelector>
            </div>
            <DiagramSelectToolbar></DiagramSelectToolbar>
        </ColumnFlexBox>
    );
});
