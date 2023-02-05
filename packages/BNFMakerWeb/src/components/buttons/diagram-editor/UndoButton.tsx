import React from "react";

import UndoIcon from "@mui/icons-material/Undo";
import { IconButton, Tooltip } from "@mui/material";

import { useUndo } from "../../../features/command/useCommand";

/**
 * ツールバーのUndoのためのボタン
 */
export const UndoButton: React.FC<{ color?: string }> = React.memo(({ color = "primary" }) => {
    const undo = useUndo();
    return (
        <Tooltip title="undo">
            <IconButton
                aria-label="undo"
                about="undo"
                onClick={() => undo()}
                sx={{
                    color: color,
                }}
            >
                <UndoIcon></UndoIcon>
            </IconButton>
        </Tooltip>
    );
});
