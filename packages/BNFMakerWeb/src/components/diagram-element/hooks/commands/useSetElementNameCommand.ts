import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { ElementNameSelectorFamily } from "../../../../recoil/diagram-element/LeafState";

/**
 * 構文図式の要素の座標を設定するためのコマンド
 */
export const useSetElementNameCommand = () => {
    return useRecoilCallback(
        ({ snapshot, set }) =>
            async (elementId: string, newName: string) => {
                const name = await snapshot.getPromise(ElementNameSelectorFamily(elementId));
                return <CommandType<void>>{
                    execute: () => {
                        set(ElementNameSelectorFamily(elementId), newName);
                    },
                    undo: () => {
                        set(ElementNameSelectorFamily(elementId), name);
                    },
                };
            },
        []
    );
};
