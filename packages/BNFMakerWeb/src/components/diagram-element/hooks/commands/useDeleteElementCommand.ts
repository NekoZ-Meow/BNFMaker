import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import {
    ElementSelector,
    useDeleteDiagramElement,
} from "../../../../recoil/diagram-element/DiagramElementState";
import {
    DirectionSelectorFamily,
    GetDirectionIdsFromElementId,
    useCreateDirection,
} from "../../../../recoil/direction/DirectionState";

/**
 * 構文図式の要素を削除するためのコマンド
 */
export const useDeleteElementCommand = () => {
    const deleteElement = useDeleteDiagramElement();
    const createDirection = useCreateDirection();
    return useRecoilCallback(
        ({ snapshot, set }) =>
            async (elementId: string) => {
                const deleteElementState = await snapshot.getPromise(ElementSelector(elementId));
                const deleteDirectionIds = await snapshot.getPromise(
                    GetDirectionIdsFromElementId(elementId)
                );
                const deleteDirectionStates = await Promise.all(
                    deleteDirectionIds.map((directionId) =>
                        snapshot.getPromise(DirectionSelectorFamily(directionId))
                    )
                );
                return <CommandType<void>>{
                    execute: () => {
                        deleteElement(elementId);
                    },
                    undo: () => {
                        set(ElementSelector(elementId), deleteElementState);
                        deleteDirectionStates.forEach(({ id, fromId, toId }) => {
                            createDirection(id, fromId, toId);
                        });
                    },
                };
            },
        [deleteElement]
    );
};
