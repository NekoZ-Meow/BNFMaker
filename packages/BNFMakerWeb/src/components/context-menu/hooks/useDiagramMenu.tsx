import { useCallback } from "react";

import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { useContextMenu } from "./useContextMenu";

/**
 * 構文図式のコンテキストメニュー
 * 現状は使用していない
 * @param diagramId 構文図式のID
 */
export const useDiagramMenu = (diagramId: string) => {
    const menuList = useCallback(
        () => (
            <MenuList>
                <MenuItem>
                    <ListItemText>{diagramId}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>テスト2</ListItemText>
                </MenuItem>
            </MenuList>
        ),
        [diagramId]
    );

    const { open, close, popover } = useContextMenu(menuList, diagramId);

    return {
        open,
        close,
        menuElement: popover,
    };
};
