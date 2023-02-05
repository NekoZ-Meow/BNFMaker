import { atomFamily, selector } from "recoil";

import { Vector2 } from "../../features/vector2/Vector2";
import { NavigationDirectionType } from "../../types/direction/DirectionType";
import { Rectangle } from "../../types/rectangle/Rectangle";
import {
    CurrentDiagramIdAtom,
    CurrentDiagramMousePositionAtom,
} from "../diagram-editor/DiagramEditorState";
import {
    DiagramElementPositionSelectorFamily,
    DiagramElementSizeSelectorFamily,
} from "../diagram-element/DiagramElementState";

/**
 * 矢印を引く際の見本となる矢印の状態
 */
export const NavigationDirectionAtomFamily = atomFamily<NavigationDirectionType, string>({
    key: "NavigationDirectionAtomFamily",
    default: (diagramId) =>
        <NavigationDirectionType>{
            diagramId: diagramId,
            fromElementId: null,
            toElementId: null,
        },
});

/**
 * 矢印を引く際の見本となる矢印の座標を取得する
 */
export const NavigationDirectionSelector = selector<{
    fromRectangle: Rectangle | null;
    toRectangle: Rectangle | null;
}>({
    key: "NavigationDirectionSelector",
    get: ({ get }) => {
        const { fromElementId, toElementId } = get(
            NavigationDirectionAtomFamily(get(CurrentDiagramIdAtom))
        );
        if (fromElementId === null) {
            return { fromRectangle: null, toRectangle: null };
        }
        const currentMousePosition = get(CurrentDiagramMousePositionAtom);

        /**
         * 構文図式の要素の矩形を作成する
         * @param elementId 構文図式の要素のID
         * @returns 構文図式の要素の矩形
         */
        const makeRectangle = (elementId: string) =>
            <Rectangle>{
                position: get(DiagramElementPositionSelectorFamily(elementId)),
                size: get(DiagramElementSizeSelectorFamily(elementId)),
            };

        const fromRectangle = makeRectangle(fromElementId);

        let toRectangle: Rectangle;
        if (toElementId === null) {
            toRectangle = <Rectangle>{
                position: currentMousePosition.sub(new Vector2(0, fromRectangle.size.y / 2)),
                size: fromRectangle.size,
            };
        } else {
            toRectangle = makeRectangle(toElementId);
        }
        return { fromRectangle, toRectangle };
    },
});
