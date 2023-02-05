import { useCallback } from "react";

import { CommandType } from "../../../../features/command/types/CommandType";
import { ID } from "../../../../features/id/ID";
import {
    useCreateDirection,
    useDeleteDirection,
} from "../../../../recoil/direction/DirectionState";

/**
 * 要素同士を繋ぐ矢印を作成するためのコマンド
 */
export const useCreateDirectionCommand = () => {
    const createDirection = useCreateDirection();
    const deleteDirection = useDeleteDirection();

    return useCallback(
        (fromId: string, toId: string) => {
            const id = ID.getID();
            return <CommandType<void>>{
                execute: () => {
                    createDirection(id, fromId, toId);
                },
                undo: () => {
                    deleteDirection(id);
                },
            };
        },
        [createDirection, deleteDirection]
    );
};
