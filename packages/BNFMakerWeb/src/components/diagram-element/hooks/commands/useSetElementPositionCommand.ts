import { useEffect, useRef } from "react";
import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { Vector2 } from "../../../../features/vector2/Vector2";
import { DiagramElementPositionSelectorFamily } from "../../../../recoil/diagram-element/DiagramElementState";

/**
 * 構文図式の要素の座標を設定するためのコマンド
 */
export const useSetElementPositionCommand = (elementId: string) => {
    const beforePosition = useRef<Vector2>(new Vector2(0, 0));

    const setBeforePosition = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
                beforePosition.current = await snapshot.getPromise(
                    DiagramElementPositionSelectorFamily(elementId)
                );
            },
        []
    );
    useEffect(() => {
        setBeforePosition();
    }, [setBeforePosition]);

    return useRecoilCallback(
        ({ set }) =>
            async (aPosition: Vector2) => {
                const position = beforePosition.current.copy();
                return <CommandType<void>>{
                    execute: () => {
                        set(DiagramElementPositionSelectorFamily(elementId), aPosition);
                        beforePosition.current = aPosition;
                    },
                    undo: () => {
                        set(DiagramElementPositionSelectorFamily(elementId), position);
                        beforePosition.current = position;
                    },
                };
            },
        []
    );
};
