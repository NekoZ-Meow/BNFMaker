/**
 * ノードの状態を使用するためのフック
 */

import { MutableRefObject } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";

import { useClick } from "../../../hooks/useClick";
import { useHover } from "../../../hooks/useHover";
import { CurrentSelectElementIdAtom } from "../../../recoil/diagram-editor/DiagramEditorState";
import { ElementSelector } from "../../../recoil/diagram-element/DiagramElementState";
import { DiagramSelectorFamily } from "../../../recoil/diagram/DiagramState";
import { NavigationDirectionAtomFamily } from "../../../recoil/direction/NavigationDirectionState";
import { NavigationDirectionType } from "../../../types/direction/DirectionType";
import { useElementMenu } from "../../context-menu/hooks/useElementMenu";

/**
/**
 * ノードの状態を使用する
 * @param elementId ノードのID
 * @param elementRectRef ノードのHTMLエレメント
 */
export const useElementControl = (
    elementId: string,
    elementContainerRef: MutableRefObject<HTMLElement>,
    elementRectRef: MutableRefObject<HTMLElement>
) => {
    const { open, menuElement } = useElementMenu(elementId);
    const setCurrentSelectElementId = useSetRecoilState(CurrentSelectElementIdAtom);

    /**
     * 右クリックをした時メニューを開く
     */
    useClick(elementRectRef, {
        onMouseRightClick: (event) => {
            open(event.pageX, event.pageY);
        },
        onMouseLeftClick: (event) => {
            setCurrentSelectElementId(elementId);
        },
    });

    // /**
    //  * マウスボタンが押された時
    //  * ノードを前面に持ってくる
    //  */
    // const onMouseDown = useCallback(
    //     (event: MouseEvent) => {
    //         console.log("node c");
    //         //event.stopPropagation();
    //         // elementContainerRef.current.parentNode.appendChild(
    //         //     elementContainerRef.current
    //         // );
    //     },
    //     [elementContainerRef]
    // );

    /**
     * ドラッグ処理を使用する
     */
    // useDragMove(elementRectRef, {
    //     onMouseDown,
    // });

    /**
     * ノードにホバーした時の処理
     */
    const onMouseEnter = useRecoilCallback(
        ({ snapshot, set }) =>
            async (event: MouseEvent) => {
                event.stopPropagation();
                const { diagramId, canDirectionEnter } = await snapshot.getPromise(
                    ElementSelector(elementId)
                );
                const { createDirectionMode } = await snapshot.getPromise(
                    DiagramSelectorFamily(diagramId)
                );
                if (!createDirectionMode || !canDirectionEnter) return;
                set(
                    NavigationDirectionAtomFamily(diagramId),
                    (current) =>
                        <NavigationDirectionType>{
                            ...current,
                            toElementId: elementId,
                        }
                );
            },
        [elementId]
    );
    const onMouseLeave = useRecoilCallback(
        ({ snapshot, set }) =>
            async (event: MouseEvent) => {
                event.stopPropagation();

                const { diagramId } = await snapshot.getPromise(ElementSelector(elementId));
                const { createDirectionMode } = await snapshot.getPromise(
                    DiagramSelectorFamily(diagramId)
                );
                if (!createDirectionMode) return;
                set(
                    NavigationDirectionAtomFamily(diagramId),
                    (current) =>
                        <NavigationDirectionType>{
                            ...current,
                            toElementId: null,
                        }
                );
            },
        [elementId]
    );
    useHover(elementRectRef, {
        onMouseEnter,
        onMouseLeave,
    });

    return { menuElement };
};
