import { useCallback } from "react";
import { useRecoilValue } from "recoil";

import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import {
    GetElementCanDeleteSelector,
    GetElementCanDuplicateSelector,
} from "../../../recoil/diagram-element/DiagramElementState";
import { useDuplicateElementCommand } from "../../diagram-element/hooks/commands/useCreateElementCommand";
import { useDeleteElementCommand } from "../../diagram-element/hooks/commands/useDeleteElementCommand";
import { useContextMenu } from "./useContextMenu";

/**
 * ノードのメニューを使用するためのフック
 * @param elementId ノードのID
 */
export const useElementMenu = (elementId: string) => {
    const commandDo = useCommandDo();
    const canDeleteElement = useRecoilValue(GetElementCanDeleteSelector(elementId));
    const canDuplicateElement = useRecoilValue(GetElementCanDuplicateSelector(elementId));
    const deleteElementCommand = useDeleteElementCommand();
    const duplicateElementCommand = useDuplicateElementCommand();
    const menuListCommand = useCallback(
        ({ close }: { close: () => void }) => (
            <MenuList>
                <MenuItem
                    onClick={async () => commandDo(await deleteElementCommand(elementId))}
                    disabled={!canDeleteElement}
                >
                    <ListItemText>Delete Element</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={async () => {
                        commandDo(await duplicateElementCommand(elementId));
                        close();
                    }}
                    disabled={!canDuplicateElement}
                >
                    <ListItemText>Duplicate Element</ListItemText>
                </MenuItem>
            </MenuList>
        ),
        [
            canDeleteElement,
            canDuplicateElement,
            commandDo,
            deleteElementCommand,
            duplicateElementCommand,
            elementId,
        ]
    );

    const { open, close, popover } = useContextMenu(menuListCommand, elementId);

    return {
        open,
        close,
        menuElement: popover,
    };
};
