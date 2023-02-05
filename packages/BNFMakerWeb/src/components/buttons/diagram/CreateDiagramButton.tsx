import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { CurrentDiagramIdAtom } from "../../../recoil/diagram-editor/DiagramEditorState";
import { GlobalThemeAtom } from "../../../recoil/theme/GlobalTheme";
import { CenterDiv } from "../../../styles/Alignment";
import { useCreateDiagramCommand } from "../../diagram/hooks/commands/useCreateDiagramCommand";

/**
 * 構文図式を追加するためのボタン
 */
export const CreateDiagramButton = React.memo(() => {
    const globalTheme = useRecoilValue(GlobalThemeAtom);
    const commandDo = useCommandDo<string>();
    const createDiagramCommand = useCreateDiagramCommand();
    const setCurrentDiagram = useSetRecoilState(CurrentDiagramIdAtom);
    return (
        <CenterDiv
            style={{
                width: "max-content",
                height: "100%",
                border: `1px solid ${globalTheme.borderColor}`,
            }}
        >
            <IconButton
                aria-label="add syntaxDiagram"
                about="add syntaxDiagram"
                onClick={() => {
                    commandDo(createDiagramCommand("aStatement")).then((diagramId) => {
                        setCurrentDiagram(diagramId);
                    });
                }}
            >
                <AddIcon></AddIcon>
            </IconButton>
        </CenterDiv>
    );
});
