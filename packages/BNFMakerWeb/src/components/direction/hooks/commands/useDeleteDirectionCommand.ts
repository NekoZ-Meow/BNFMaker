import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import {
    DirectionSelectorFamily,
    useCreateDirection,
    useDeleteDirection,
} from "../../../../recoil/direction/DirectionState";

/**
 * 要素同士を繋ぐ矢印を削除するためのコマンド
 */
export const useDeleteDirectionCommand = () => {
    const createDirection = useCreateDirection();
    const deleteDirection = useDeleteDirection();

    return useRecoilCallback(
        ({ snapshot }) =>
            async (directionId: string) => {
                const { id, fromId, toId } = await snapshot.getPromise(
                    DirectionSelectorFamily(directionId)
                );
                return <CommandType<void>>{
                    execute: () => {
                        deleteDirection(directionId);
                    },
                    undo: () => {
                        createDirection(id, fromId, toId);
                    },
                };
            },
        [createDirection, deleteDirection]
    );
};
