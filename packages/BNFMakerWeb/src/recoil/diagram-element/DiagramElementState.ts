import {
    atom,
    atomFamily,
    DefaultValue,
    selector,
    selectorFamily,
    useRecoilCallback,
} from "recoil";
import stringWidth from "string-width";

import { ID } from "../../features/id/ID";
import { Vector2 } from "../../features/vector2/Vector2";
import { DiagramElementKind } from "../../types/diagram-element/DiagramElementKind";
import {
    DiagramElementType,
    LeafType,
    NodeType,
} from "../../types/diagram-element/DiagramElementType";
import { DiagramNameSelectorFamily } from "../diagram/DiagramState";
import {
    DirectionSelectorFamily,
    GetAllDirectionStateSelector,
    GetDirectionIdsFromElementId,
    useCreateDirection,
} from "../direction/DirectionState";
import { ElementThemeAtom } from "../theme/ElementTheme";
import { ElementNameSelectorFamily } from "./LeafState";
import { BindDiagramIdSelectorFamily } from "./NodeState";

/**
 * 構文図式の要素のIDを記録する
 */
const ElementIdsAtom = atom({
    key: "ElementIdsAtom",
    default: new Set<string>(),
});

/**
 * 構文図式の要素IDと構文図式IDの対応
 */
const DiagramIdBelongElementAtomFamily = atomFamily<string, string>({
    key: "DiagramIdBelongElementAtomFamily",
    default: "",
});

/**
 * 構文図式の要素IDと座標の対応
 */
const ElementPositionAtomFamily = atomFamily<Vector2, string>({
    key: "ElementPositionAtomFamily",
    default: new Vector2(0, 0),
});

/**
 * 構文図式の要素IDと構文図式の要素タイプの対応
 */
const ElementKindAtomFamily = atomFamily<DiagramElementKind, string>({
    key: "ElementKindAtomFamily",
    default: DiagramElementKind.Leaf,
});

/**
 * 構文図式の要素IDと構文図式の要素が削除可能かの対応
 */
const ElementCanDeleteAtomFamily = atomFamily<boolean, string>({
    key: "ElementCanDeleteAtomFamily",
    default: true,
});

/**
 * 構文図式の要素IDと他構文図式の要素からの矢印の接続が可能かの対応
 */
const ElementCanDirectionEnterAtomFamily = atomFamily<boolean, string>({
    key: "ElementCanDirectionEnterAtomFamily",
    default: true,
});

/**
 * 構文図式の要素IDと他構文図式の要素への矢印の接続が可能かの対応
 */
const ElementCanDirectionLeaveAtomFamily = atomFamily<boolean, string>({
    key: "ElementCanDirectionLeaveAtomFamily",
    default: true,
});

/**
 * 構文図式の要素IDと他構文図式の要素への矢印の接続が可能かの対応
 */
const ElementCanDuplicateAtomFamily = atomFamily<boolean, string>({
    key: "ElementCanDuplicateAtomFamily",
    default: true,
});

/**
 * ElementStateのキー名とAtomFamilyとの対応
 */
const keyAndAtomFamilyMap = {
    diagramId: DiagramIdBelongElementAtomFamily,
    position: ElementPositionAtomFamily,
    kind: ElementKindAtomFamily,
    canDelete: ElementCanDeleteAtomFamily,
    canDirectionEnter: ElementCanDirectionEnterAtomFamily,
    canDirectionLeave: ElementCanDirectionLeaveAtomFamily,
    canDuplicate: ElementCanDuplicateAtomFamily,
    bindDiagramId: BindDiagramIdSelectorFamily,
    name: ElementNameSelectorFamily,
};

/**
 * 構文図式の要素の状態を管理するセレクター
 * 求めていない再レンダリングに注意
 */
export const ElementSelector = selectorFamily<LeafType | NodeType, string>({
    key: "ElementsSelector",
    get:
        (elementId) =>
        ({ get }) => {
            const aState = {
                id: elementId,
                diagramId: get(DiagramIdBelongElementAtomFamily(elementId)),
                position: get(ElementPositionAtomFamily(elementId)),
                kind: get(ElementKindAtomFamily(elementId)),
                canDelete: get(ElementCanDeleteAtomFamily(elementId)),
                canDirectionEnter: get(ElementCanDirectionEnterAtomFamily(elementId)),
                canDirectionLeave: get(ElementCanDirectionLeaveAtomFamily(elementId)),
                canDuplicate: get(ElementCanDuplicateAtomFamily(elementId)),
            };
            if (aState.kind === DiagramElementKind.Node) {
                return {
                    ...aState,
                    bindDiagramId: get(BindDiagramIdSelectorFamily(elementId)),
                };
            } else {
                return {
                    ...aState,
                    name: get(ElementNameSelectorFamily(elementId)),
                };
            }
        },

    set:
        (id) =>
        ({ get, set, reset }, elementState) => {
            if (elementState instanceof DefaultValue) {
                const deleteDirectionIds = get(GetAllDirectionStateSelector).flatMap(
                    (directionState) => {
                        if (id === directionState.fromId || id === directionState.toId) {
                            return [directionState.id];
                        }
                        return [];
                    }
                );
                deleteDirectionIds.forEach((directionId) =>
                    reset(DirectionSelectorFamily(directionId))
                );
                Object.values(keyAndAtomFamilyMap).forEach((anAtomFamily) => {
                    reset(anAtomFamily(id));
                });
                set<Set<string>>(ElementIdsAtom, (oldValue) => {
                    oldValue.delete(id);
                    return new Set<string>(oldValue);
                });
                return;
            }
            Object.keys(elementState).forEach((aKey) => {
                if (keyAndAtomFamilyMap[aKey] !== undefined) {
                    set(keyAndAtomFamilyMap[aKey](id), elementState[aKey]);
                }
            });

            // IDが存在していない場合、集合に追加
            set<Set<string>>(ElementIdsAtom, (oldValue) => {
                if (oldValue.has(id)) return oldValue;
                oldValue.add(id);
                return new Set<string>(oldValue);
            });
        },
});

/**
 * 構文図式の要素IDから構文図式の要素の種類を返す
 * 種類しか使用しない場合はElementSelectorよりもパフォーマンスがよい
 */
export const ElementKindSelectorFamily = selectorFamily<DiagramElementKind, string>({
    key: "ElementKindSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementKindAtomFamily(elementId));
        },
});

/**
 * 構文図式の要素IDから構文図式の要素が削除可能かを返す
 */
export const GetElementCanDeleteSelector = selectorFamily<boolean, string>({
    key: "GetElementCanDeleteSelector",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementCanDeleteAtomFamily(elementId));
        },
});

/**
 * 構文図式の要素IDから他構文図式の要素からの矢印の接続が可能かを返す
 */
export const GetElementCanDirectionEnterSelector = selectorFamily<boolean, string>({
    key: "GetElementCanDirectionEnterSelector",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementCanDirectionEnterAtomFamily(elementId));
        },
});

/**
 * 構文図式の要素IDから他構文図式の要素への矢印の接続が可能かを返す
 */
export const GetElementCanDirectionLeaveSelector = selectorFamily<boolean, string>({
    key: "GetElementCanDirectionLeaveSelector",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementCanDirectionLeaveAtomFamily(elementId));
        },
});

/**
 * 構文図式の要素が複製可能かどうかを返す
 */
export const GetElementCanDuplicateSelector = selectorFamily<boolean, string>({
    key: "GetElementCanDuplicateSelector",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementCanDuplicateAtomFamily(elementId));
        },
});

/**
 * 構文図式の要素のIDの配列を取得するするセレクター
 * このセレクターの処理をElementStateを返すものにすると、構文図式の要素の移動などで不要な再レンダリングが走るのでNG
 * IDで管理することで、構文図式の要素の生成・削除にトリガーを制限できる
 */
export const GetAllElementIdsSelector = selector<Array<string>>({
    key: "GetAllElementIdsSelector",
    get: ({ get }) => {
        return Array.from(get(ElementIdsAtom));
    },
});

/**
 * 全ての構文図式の要素の状態を配列で取得するセレクター
 * 構文図式の要素の移動などでもレンダリングが走るのでパフォーマンス注意
 */
export const GetAllElementStateSelector = selector<Array<DiagramElementType>>({
    key: "GetAllElementStateSelector",
    get: ({ get }) => {
        return get(GetAllElementIdsSelector).map((elementId) => get(ElementSelector(elementId)));
    },
});

/**
 * 構文図式IDからその構文図式で使用されている構文図式の要素のIDを配列にして返すセレクター
 */
export const GetElementIdsFromDiagramId = selectorFamily<Array<string>, string>({
    key: "GetElementIdsFromDiagramId",
    get:
        (diagramId: string) =>
        ({ get }) => {
            return get(GetAllElementIdsSelector).filter(
                (elementId) => get(DiagramIdBelongElementAtomFamily(elementId)) === diagramId
            );
        },
});

/**
 * 構文図式の要素の座標を使用する
 */
export const DiagramElementPositionSelectorFamily = selectorFamily<Vector2, string>({
    key: "DiagramElementPositionSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(ElementPositionAtomFamily(elementId));
        },
    set:
        (elementId: string) =>
        ({ set }, newValue) => {
            set(ElementPositionAtomFamily(elementId), newValue);
        },
});

/**
 * 構文図式の要素の名前を使用する
 */
export const DiagramElementNameSelectorFamily = selectorFamily<string, string>({
    key: "DiagramElementNameSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            const elementKind = get(ElementKindAtomFamily(elementId));
            let aName: string;
            if (elementKind === DiagramElementKind.Node) {
                aName = get(DiagramNameSelectorFamily(get(BindDiagramIdSelectorFamily(elementId))));
            } else {
                aName = get(ElementNameSelectorFamily(elementId));
            }
            return aName;
        },
});

/**
 * 構文図式の要素の大きさを使用する
 */
export const DiagramElementSizeSelectorFamily = selectorFamily<Vector2, string>({
    key: "DiagramElementSizeSelectorFamily",
    get:
        (elementId: string) =>
        ({ get }) => {
            const elementTheme = get(ElementThemeAtom);
            const kind = get(ElementKindSelectorFamily(elementId));
            if (kind === DiagramElementKind.End || kind === DiagramElementKind.Start) {
                // 開始・終了記号の場合の大きさ
                const outsideDiameter = elementTheme.elementSize * 2;
                return new Vector2(outsideDiameter, outsideDiameter);
            }

            const elementName = get(DiagramElementNameSelectorFamily(elementId));
            const length = Math.max(stringWidth(elementName), 3);
            return new Vector2(
                (length * elementTheme.elementSize) / 1.65 + 10,
                elementTheme.elementSize * 3
            );
        },
});

/**
 * 構文図式の要素を削除する関数を使用する
 * @returns 構文図式の要素を削除する関数
 */
export const useDeleteDiagramElement = () => {
    return useRecoilCallback(
        ({ reset }) =>
            (elementId: string) => {
                reset(ElementSelector(elementId));
            },
        []
    );
};

/**
 * 構文図式の要素を複製する関数を使用する
 * @returns 構文図式の要素を複製する関数
 */
export const useDuplicateDiagramElement = () => {
    const createDirection = useCreateDirection();
    return useRecoilCallback(
        ({ snapshot, set }) =>
            async (elementId: string, newElementId: string, position?: Vector2 | undefined) => {
                const [elementState, directionIds] = await Promise.all([
                    snapshot.getPromise(ElementSelector(elementId)),
                    snapshot.getPromise(GetDirectionIdsFromElementId(elementId)),
                ]);
                if (position === undefined) {
                    position = elementState.position.add(new Vector2(10, 10));
                }
                const newElementState = <DiagramElementType>{
                    ...elementState,
                    id: newElementId,
                    position,
                };
                const directionStates = await Promise.all(
                    directionIds.map((directionId) =>
                        snapshot.getPromise(DirectionSelectorFamily(directionId))
                    )
                );

                set(ElementSelector(newElementId), newElementState);
                directionStates.forEach(({ fromId, toId }) => {
                    if (fromId === elementId) fromId = newElementId;
                    if (toId === elementId) toId = newElementId;
                    createDirection(ID.getID(), fromId, toId);
                });
                return newElementId;
            },
        [createDirection]
    );
};
