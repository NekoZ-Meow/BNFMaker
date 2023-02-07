import { MutableRefObject, useCallback, useRef } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";

import { useCommandDo } from "../../../features/command/useCommand";
import { Vector2 } from "../../../features/vector2/Vector2";
import { useDragMove } from "../../../hooks/useDragMove";
import { DiagramElementPositionSelectorFamily } from "../../../recoil/diagram-element/DiagramElementState";
import { useSetElementPositionCommand } from "./commands/useSetElementPositionCommand";

/**
 * 構文図式の要素の移動を行うためのフック
 * @returns 要素の座標
 */
export const useDiagramElementDragMove = (
    diagramElementId: string,
    elementRef: MutableRefObject<HTMLElement>
) => {
    const isDragged = useRef<boolean>(false);
    const commandDo = useCommandDo();
    const setPosition = useSetRecoilState(DiagramElementPositionSelectorFamily(diagramElementId));
    const setPositionCommand = useSetElementPositionCommand(diagramElementId);

    /**
     * マウスをドラッグした時、ノードを動かす
     */
    const onMouseDrag = useCallback(
        async ({ movement }: { event: MouseEvent | TouchEvent; movement: Vector2 }) => {
            //event.preventDefault();

            setPosition((current) => current.add(movement));
            isDragged.current = true;
        },
        [setPosition]
    );

    /**
     * マウスが離れた時、座標を移動し、履歴を保存する
     */
    const onMouseUp = useRecoilCallback(
        ({ snapshot }) =>
            async ({ event, movement }: { event: MouseEvent | TouchEvent; movement: Vector2 }) => {
                if (!isDragged.current) return;
                isDragged.current = false;
                event.preventDefault();
                const currentPosition = await snapshot.getPromise(
                    DiagramElementPositionSelectorFamily(diagramElementId)
                );
                commandDo(await setPositionCommand(currentPosition.add(movement)));
            },
        [commandDo, diagramElementId, setPositionCommand]
    );

    useDragMove(elementRef, {
        onMouseDrag,
        onMouseUp,
        onMouseDown: ({ event }) => event.stopImmediatePropagation(),
    });
};
