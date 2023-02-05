import React from "react";
import { useRecoilCallback } from "recoil";

import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { CurrentDiagramIdAtom } from "../../../recoil/diagram-editor/DiagramEditorState";
import { OffsetSelectorFamily } from "../../../recoil/diagram/DiagramState";
import { useCreateLeafCommand } from "../../diagram-element/hooks/commands/useCreateElementCommand";

/**
 * ツールバーの終端ノード作成のためのボタン
 */
export const CreateLeafButton: React.FC<{ color?: string }> = React.memo(
    ({ color = "primary" }) => {
        const commandDo = useCommandDo();
        const createLeafCommand = useCreateLeafCommand();
        const onClickHandler = useRecoilCallback(
            ({ snapshot }) =>
                async () => {
                    const currentDiagramId = await snapshot.getPromise(CurrentDiagramIdAtom);
                    if (currentDiagramId === "") return;

                    const offset = await snapshot.getPromise(
                        OffsetSelectorFamily(currentDiagramId)
                    );
                    commandDo(createLeafCommand(currentDiagramId, "aLeaf", offset));
                },
            []
        );

        return (
            <Tooltip title="crate terminal">
                <IconButton
                    aria-label="create terminal"
                    about="create terminal"
                    onClick={onClickHandler}
                    sx={{
                        color: color,
                    }}
                >
                    <AddIcon></AddIcon>
                </IconButton>
            </Tooltip>
        );
    }
);
