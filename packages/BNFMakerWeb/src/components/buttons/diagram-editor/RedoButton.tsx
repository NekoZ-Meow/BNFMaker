import React from "react";

import RedoIcon from "@mui/icons-material/Redo";
import { IconButton, Tooltip } from "@mui/material";

import { useRedo } from "../../../features/command/useCommand";

/**
 * ツールバーのUndoのためのボタン
 */
export const RedoButton: React.FC<{ color?: string }> = React.memo(({ color = "primary" }) => {
    const redo = useRedo();
    return (
        <Tooltip title="redo">
            <IconButton
                aria-label="redo"
                about="redo"
                onClick={() => redo()}
                sx={{
                    color: color,
                }}
            >
                <RedoIcon></RedoIcon>
            </IconButton>
        </Tooltip>
    );
});
