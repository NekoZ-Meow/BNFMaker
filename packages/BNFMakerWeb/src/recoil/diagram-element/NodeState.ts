/**
 * 非終端記号の状態
 */

import { atomFamily, selectorFamily, useRecoilCallback } from "recoil";

import { Vector2 } from "../../features/vector2/Vector2";
import { DiagramElementKind } from "../../types/diagram-element/DiagramElementKind";
import { DiagramElementType } from "../../types/diagram-element/DiagramElementType";
import { ElementSelector } from "./DiagramElementState";

/**
 * 構文図式の要素IDと結び付けられている構文図式IDの対応
 */
const BindDiagramIdAtomFamily = atomFamily<string, string>({
    key: "BindDiagramIdAtomFamily",
    default: "",
});

/**
 * 結び付けられている構文図式IDを使用する
 * @param elementId 構文図式の要素のID
 * @returns 結び付けられている構文図式ID
 */
export const BindDiagramIdSelectorFamily = selectorFamily<string, string>({
    key: "BindDiagramIdSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(BindDiagramIdAtomFamily(elementId));
        },
    set:
        (elementId: string) =>
        ({ set }, newValue) => {
            set(BindDiagramIdAtomFamily(elementId), newValue);
        },
});

/**
 * 非終端記号を作成するための関数を使用する
 */
export const useCreateNode = () => {
    return useRecoilCallback(
        ({ set }) =>
            (
                id: string,
                diagramId: string,
                bindDiagramId: string,
                position = new Vector2(0, 0),
                canDelete = true,
                canDirectionEnter = true,
                canDirectionLeave = true,
                canDuplicate = true
            ) => {
                set(ElementSelector(id), <DiagramElementType>{
                    id,
                    diagramId,
                    kind: DiagramElementKind.Node,
                    position,
                    canDelete,
                    canDirectionEnter,
                    canDirectionLeave,
                    canDuplicate,
                });
                set(BindDiagramIdAtomFamily(id), bindDiagramId);
                return id;
            },
        []
    );
};
