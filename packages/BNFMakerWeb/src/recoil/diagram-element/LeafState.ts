/**
 * 終端記号の状態
 */

import { atomFamily, selectorFamily, useRecoilCallback } from "recoil";

import { Vector2 } from "../../features/vector2/Vector2";
import { DiagramElementKind } from "../../types/diagram-element/DiagramElementKind";
import { DiagramElementType } from "../../types/diagram-element/DiagramElementType";
import { ElementSelector } from "./DiagramElementState";

/**
 * 構文図式の要素IDと名前の対応
 * 非終端記号は構文図式の名前を参照するため、このパラメータを持たない
 */
const ElementNameAtomFamily = atomFamily<string, string>({
    key: "ElementNameAtomFamily",
    default: "",
});

/**
 * 構文図式の要素の名前を使用する
 */
export const ElementNameSelectorFamily = selectorFamily<string, string>({
    key: "ElementNameSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementNameAtomFamily(elementId));
        },

    set:
        (elementId: string) =>
        ({ set }, newValue) => {
            set(ElementNameAtomFamily(elementId), newValue);
        },
});

/**
 * 終端記号を作成するための関数を使用する
 * @returns 終端記号を作成するための関数
 */
export const useCreateLeaf = () => {
    return useRecoilCallback(
        ({ set }) =>
            (
                id: string,
                diagramId: string,
                name: string,
                position: Vector2 = new Vector2(0, 0),
                canDelete = true,
                canDirectionEnter = true,
                canDirectionLeave = true,
                canDuplicate = true
            ) => {
                set(ElementSelector(id), <DiagramElementType>{
                    id,
                    diagramId,
                    kind: DiagramElementKind.Leaf,
                    position,
                    canDelete,
                    canDirectionEnter,
                    canDirectionLeave,
                    canDuplicate,
                });
                set(ElementNameSelectorFamily(id), name);
                return id;
            },
        []
    );
};

/**
 * 開始記号を作成するための関数を使用する
 * @returns 開始記号を作成するための関数
 */
export const useCreateStart = () => {
    return useRecoilCallback(
        ({ set }) =>
            (id: string, diagramId: string, position: Vector2 = new Vector2(0, 0)) => {
                set(ElementSelector(id), <DiagramElementType>{
                    id,
                    diagramId,
                    kind: DiagramElementKind.Start,
                    position,
                    canDelete: false,
                    canDirectionEnter: false,
                    canDirectionLeave: true,
                    canDuplicate: false,
                });
                set(ElementNameSelectorFamily(id), "");
                return id;
            },
        []
    );
};

/**
 * 終了記号を作成するための関数を使用する
 * @returns 終了記号を作成するための関数
 */
export const useCreateEnd = () => {
    return useRecoilCallback(
        ({ set }) =>
            (id: string, diagramId: string, position: Vector2 = new Vector2(0, 0)) => {
                set(ElementSelector(id), <DiagramElementType>{
                    id,
                    diagramId,
                    kind: DiagramElementKind.End,
                    position,
                    canDelete: false,
                    canDirectionEnter: true,
                    canDirectionLeave: false,
                    canDuplicate: false,
                });
                set(ElementNameSelectorFamily(id), "");
                return id;
            },
        []
    );
};
