import { useCallback } from "react";
import { useRecoilCallback } from "recoil";

import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { CurrentDiagramIdAtom } from "../../../recoil/diagram-editor/DiagramEditorState";
import { OffsetSelectorFamily } from "../../../recoil/diagram/DiagramState";
import { useCreateNodeCommand } from "../../diagram-element/hooks/commands/useCreateElementCommand";
import { useDeleteDiagramCommand } from "../../diagram/hooks/commands/useDeleteDiagramCommand";
import { useContextMenu } from "./useContextMenu";

/**
 * 構文図式のメニューを使用するためのフック
 * @param diagramId 構文図式のID
 */
export const useDiagramTabMenu = (diagramId: string) => {
    const commandDo = useCommandDo();
    const createNodeCommand = useCreateNodeCommand();
    const deleteDiagramCommand = useDeleteDiagramCommand();

    /**
     * ノードを作成するためのハンドラ
     */
    const createNodeHandler = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
                const currentDiagramId = await snapshot.getPromise(CurrentDiagramIdAtom);
                if (currentDiagramId === "") return;
                const offset = await snapshot.getPromise(OffsetSelectorFamily(currentDiagramId));
                commandDo(createNodeCommand(currentDiagramId, diagramId, offset));
            },
        [createNodeCommand, commandDo]
    );

    const menuList = useCallback(
        ({ close }: { close: () => void }) => (
            <MenuList>
                <MenuItem
                    onClick={async () => {
                        createNodeHandler();
                        close();
                    }}
                >
                    <ListItemText>Create Node</ListItemText>
                </MenuItem>
                <MenuItem onClick={async () => commandDo(await deleteDiagramCommand(diagramId))}>
                    <ListItemText>Delete Diagram</ListItemText>
                </MenuItem>
            </MenuList>
        ),
        [commandDo, deleteDiagramCommand, diagramId, createNodeHandler]
    );

    const { open, close, popover } = useContextMenu(menuList, diagramId);

    return {
        open,
        close,
        menuElement: popover,
    };
};
