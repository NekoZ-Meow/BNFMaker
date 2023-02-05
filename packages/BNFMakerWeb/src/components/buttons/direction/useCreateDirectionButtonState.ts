import { MutableRefObject, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { useClick } from "../../../hooks/useClick";
import { useHover } from "../../../hooks/useHover";
import { CurrentSelectElementIdAtom } from "../../../recoil/diagram-editor/DiagramEditorState";
import {
    ElementSelector,
    GetElementCanDirectionLeaveSelector,
} from "../../../recoil/diagram-element/DiagramElementState";
import { DiagramSelectorFamily } from "../../../recoil/diagram/DiagramState";
import { NavigationDirectionAtomFamily } from "../../../recoil/direction/NavigationDirectionState";
import { ElementThemeAtom } from "../../../recoil/theme/ElementTheme";

/**
 * 矢印を作成するためのボタンを使用する
 */
export const useCreateDirectionButtonState = (
    elementId: string,
    elementRef: MutableRefObject<null>,
    buttonRef: MutableRefObject<null>
) => {
    const elementTheme = useRecoilValue(ElementThemeAtom);
    const currentSelectElementId = useRecoilValue(CurrentSelectElementIdAtom);
    const canDirectionLeave = useRecoilValue(GetElementCanDirectionLeaveSelector(elementId));
    // const [isVisible, setIsVisible] = useState(false);
    const isVisible = currentSelectElementId === elementId && canDirectionLeave;
    const [color, setColor] = useState(elementTheme.directionLight);

    /**
     * 左クリックした時
     */
    const onMouseLeftClick = useRecoilCallback(
        ({ set, snapshot }) =>
            async (event: MouseEvent) => {
                event.stopPropagation();
                const { canDirectionLeave, diagramId } = await snapshot.getPromise(
                    ElementSelector(elementId)
                );

                if (!canDirectionLeave) return;
                set(NavigationDirectionAtomFamily(diagramId), (current) => ({
                    ...current,
                    fromElementId: elementId,
                }));
                set(DiagramSelectorFamily(diagramId), (current) => ({
                    ...current,
                    createDirectionMode: true,
                }));
            },
        [elementId]
    );

    /**
     * クリックした際に矢印生成モードに設定する
     */
    useClick(buttonRef, {
        onMouseLeftClick,
    });

    /**
     * ボタンにホバーした際に色を変える
     */
    useHover(buttonRef, {
        onMouseEnter: () => setColor(elementTheme.directionDark),
        onMouseLeave: () => setColor(elementTheme.directionLight),
    });

    // /**
    //  * ノードにホバーした際表示する
    //  */
    // const onMouseEnter = useRecoilCallback(
    //     ({ snapshot }) =>
    //         async () => {
    //             console.log(elementRef.current);
    //             const { diagramId, canDirectionLeave } =
    //                 await snapshot.getPromise(ElementSelector(elementId));
    //             const { createDirectionMode } = await snapshot.getPromise(
    //                 DiagramSelectorFamily(diagramId)
    //             );
    //             setIsVisible(!createDirectionMode && canDirectionLeave);
    //         },
    //     [elementId, setIsVisible]
    // );

    // useHover(elementRef, {
    //     onMouseEnter,
    //     onMouseLeave: () => setIsVisible(false),
    // });
    return { isVisible, color };
};
