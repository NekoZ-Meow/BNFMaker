import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { GetElementIdsFromDiagramId } from "../../../../recoil/diagram-element/DiagramElementState";
import {
    DiagramSelectorFamily,
    useCreateDiagram,
    useDeleteDiagram,
} from "../../../../recoil/diagram/DiagramState";
import { useDeleteElementCommand } from "../../../diagram-element/hooks/commands/useDeleteElementCommand";

/**
 * 構文図式を削除するためのコマンド
 */
export const useDeleteDiagramCommand = () => {
    const createDiagram = useCreateDiagram();
    const deleteDiagram = useDeleteDiagram();
    const deleteElementCommand = useDeleteElementCommand();

    return useRecoilCallback(
        ({ snapshot }) =>
            async (diagramId: string) => {
                const [deleteDiagramState, deleteElementIds] = await Promise.all([
                    snapshot.getPromise(DiagramSelectorFamily(diagramId)),
                    snapshot.getPromise(GetElementIdsFromDiagramId(diagramId)),
                ]);
                const deleteElementCommands = await Promise.all(
                    deleteElementIds.map((anId) => deleteElementCommand(anId))
                );

                return <CommandType<void>>{
                    execute: () => {
                        deleteDiagram(diagramId);
                    },
                    undo: () => {
                        createDiagram(diagramId, deleteDiagramState.name);
                        deleteElementCommands.forEach((command) => command.undo());
                    },
                };
            },
        []
    );
};
