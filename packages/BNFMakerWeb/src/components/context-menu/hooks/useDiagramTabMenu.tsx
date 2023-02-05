import { useCallback } from "react";

import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { useDeleteDiagramCommand } from "../../diagram/hooks/commands/useDeleteDiagramCommand";
import { useContextMenu } from "./useContextMenu";

/**
 * 構文図式のメニューを使用するためのフック
 * @param diagramId 構文図式のID
 */
export const useDiagramTabMenu = (diagramId: string) => {
    const commandDo = useCommandDo();
    const deleteDiagramCommand = useDeleteDiagramCommand();
    const menuList = useCallback(
        () => (
            <MenuList>
                <MenuItem onClick={async () => commandDo(await deleteDiagramCommand(diagramId))}>
                    <ListItemText>Delete Diagram</ListItemText>
                </MenuItem>
            </MenuList>
        ),
        [commandDo, deleteDiagramCommand, diagramId]
    );

    const { open, close, popover } = useContextMenu(menuList, diagramId);

    return {
        open,
        close,
        menuElement: popover,
    };
};
