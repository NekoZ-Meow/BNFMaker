import { useCallback } from "react";

import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { useDeleteDirectionCommand } from "../../direction/hooks/commands/useDeleteDirectionCommand";
import { useContextMenu } from "./useContextMenu";

/**
 * 矢印のメニューを使用するためのフック
 * @param directionId 矢印のID
 */
export const useDirectionMenu = (directionId: string) => {
    const commandDo = useCommandDo();
    const deleteDirectionCommand = useDeleteDirectionCommand();
    const menuList = useCallback(
        () => (
            <MenuList>
                <MenuItem
                    onClick={async () => commandDo(await deleteDirectionCommand(directionId))}
                >
                    <ListItemText>Delete Direction</ListItemText>
                </MenuItem>
            </MenuList>
        ),
        [commandDo, deleteDirectionCommand, directionId]
    );

    const { open, close, popover } = useContextMenu(menuList, directionId);

    return {
        open,
        close,
        menuElement: popover,
    };
};
