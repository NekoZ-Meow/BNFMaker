import React from "react";
import { useRecoilValue } from "recoil";

import { Toolbar } from "@mui/material";

import { GlobalThemeAtom } from "../../recoil/theme/GlobalTheme";
import { ControlToolbarThemeAtom } from "../../recoil/theme/ToolbarTheme";
import { RedoButton } from "../buttons/diagram-editor/RedoButton";
import { UndoButton } from "../buttons/diagram-editor/UndoButton";
import { CreateLeafButton } from "../buttons/diagram-element/CreateLeafButton";

/**
 * 構文図式のUndo,Redoやノード作成の操作を行えるツールバー
 */
export const DiagramControlToolbar = React.memo(() => {
    const toolbarStyle = useRecoilValue(ControlToolbarThemeAtom);
    const { borderColor } = useRecoilValue(GlobalThemeAtom);
    return (
        <Toolbar
            variant="regular"
            style={{
                backgroundColor: toolbarStyle.backGroundColor,
                flexBasis: `${toolbarStyle.heightPx}px`,
                height: `${toolbarStyle.heightPx}px`,
                minHeight: `${toolbarStyle.heightPx}px`,
                borderColor: borderColor,
                borderStyle: "solid",
                borderWidth: "1px 0px 2px 0px",
            }}
        >
            <UndoButton color={toolbarStyle.buttonColor}></UndoButton>
            <RedoButton color={toolbarStyle.buttonColor}></RedoButton>
            <CreateLeafButton color={toolbarStyle.buttonColor}></CreateLeafButton>
        </Toolbar>
    );
});
