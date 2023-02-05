import {
    atom,
    atomFamily,
    DefaultValue,
    selector,
    selectorFamily,
    useRecoilCallback,
} from "recoil";

import { Vector2 } from "../../features/vector2/Vector2";
import { DiagramType } from "../../types/diagram/DiagramType";
import { CurrentDiagramIdAtom } from "../diagram-editor/DiagramEditorState";
import {
    ElementSelector,
    GetElementIdsFromDiagramId,
} from "../diagram-element/DiagramElementState";

/**
 * 構文図式ののIDを記録する
 */
const DiagramIdsAtom = atom({
    key: "DiagramIdsAtom",
    default: new Set<string>(),
});

/**
 * 構文図式IDと矢印制作モードの対応
 */
const CreateDirectionModeAtom = atomFamily<boolean, string>({
    key: "CreateDirectionModeAtom",
    default: false,
});

/**
 * 構文図式IDと構文図式の名前の対応
 */
const DiagramNameAtom = atomFamily<string, string>({
    key: "DiagramNameAtom",
    default: "",
});

/**
 * 構文図式IDとオフセットの対応
 */
const OffsetAtom = atomFamily<Vector2, string>({
    key: "OffsetAtom",
    default: new Vector2(0, 0),
});

/**
 * 構文図式の状態とIDを紐づけて管理する
 */
export const DiagramSelectorFamily = selectorFamily<DiagramType, string>({
    key: "DiagramSelectorFamily",
    get:
        (id) =>
        ({ get }) => {
            return {
                id: id,
                createDirectionMode: get(CreateDirectionModeAtom(id)),
                name: get(DiagramNameAtom(id)),
                offset: get(OffsetAtom(id)),
            };
        },

    set:
        (id) =>
        ({ get, set, reset }, diagramState) => {
            const beforeDiagramState = get(DiagramSelectorFamily(id));
            if (diagramState instanceof DefaultValue) {
                //使用されているノードの削除
                get(GetElementIdsFromDiagramId(id)).map((elementId) => {
                    reset(ElementSelector(elementId));
                });
                //構文図式の削除
                reset(CreateDirectionModeAtom(id));
                reset(DiagramNameAtom(id));
                reset(OffsetAtom(id));
                set<Set<string>>(DiagramIdsAtom, (oldValue) => {
                    oldValue.delete(id);
                    return new Set<string>(oldValue);
                });
                return;
            }
            set<boolean>(CreateDirectionModeAtom(id), diagramState.createDirectionMode);

            if (beforeDiagramState.name !== diagramState.name) {
                set<string>(DiagramNameAtom(id), diagramState.name);
            }
            if (beforeDiagramState.offset != diagramState.offset) {
                set<Vector2>(OffsetAtom(id), diagramState.offset);
            }

            // IDが存在していない場合は配列に追加する
            set<Set<string>>(DiagramIdsAtom, (oldValue) => {
                if (oldValue.has(id)) return oldValue;
                oldValue.add(id);
                return new Set<string>(oldValue);
            });
        },
});

/**
 * 構文図式のIDを全て取得する
 */
export const GetAllDiagramIdsSelector = selector<Array<string>>({
    key: "GetAllDiagramIdsSelector",
    get: ({ get }) => {
        return Array.from(get(DiagramIdsAtom));
    },
});

/**
 * 構文図式のIDを全て取得する
 */
export const GetAllDiagramStateSelector = selector<Array<DiagramType>>({
    key: "GetAllDiagramStateSelector",
    get: ({ get }) => {
        return get(GetAllDiagramIdsSelector).map((diagramId) =>
            get(DiagramSelectorFamily(diagramId))
        );
    },
});

/**
 * 構文図式のIDから構文図式の名前を取得する
 * 存在しない構文図式IDが指定された場合は空文字列を返す
 * 名前しか使用しない場合はこちらを使用する方がパフォーマンス改善になる
 */
export const DiagramNameSelectorFamily = selectorFamily<string, string>({
    key: "DiagramNameSelectorFamily",
    get:
        (diagramId: string) =>
        ({ get }) => {
            return get(DiagramNameAtom(diagramId));
        },
    set:
        (diagramId: string) =>
        ({ set }, newValue) => {
            set(DiagramNameAtom(diagramId), newValue);
        },
});

/**
 * 構文図式のオフセットの値
 */
export const OffsetSelectorFamily = selectorFamily<Vector2, string>({
    key: "OffsetSelectorFamily",
    get:
        (diagramId: string) =>
        ({ get }) => {
            return get(OffsetAtom(diagramId));
        },
    set:
        (diagramId: string) =>
        ({ set }, newValue) => {
            return set(OffsetAtom(diagramId), newValue);
        },
});

/**
 * 構文図式が矢印制作モードか
 */
export const CreateDirectionModeSelectorFamily = selectorFamily<boolean, string>({
    key: "CreateDirectionModeSelectorFamily",
    get:
        (diagramId: string) =>
        ({ get }) => {
            return get(CreateDirectionModeAtom(diagramId));
        },
    set:
        (diagramId: string) =>
        ({ set }, newValue) => {
            return set(CreateDirectionModeAtom(diagramId), newValue);
        },
});

/**
 * 構文図式を作成するための関数を使用する
 * @returns 構文図式を作成するための関数
 */
export const useCreateDiagram = () => {
    return useRecoilCallback(
        ({ set }) =>
            (diagramId: string, name: string) => {
                set(DiagramSelectorFamily(diagramId), <DiagramType>{
                    id: diagramId,
                    createDirectionMode: false,
                    offset: new Vector2(0, 0),
                    name,
                });
                return diagramId;
            },
        []
    );
};

/**
 * 構文図式を削除するための関数を使用する
 * @returns 構文図式を削除するための関数
 */
export const useDeleteDiagram = () => {
    return useRecoilCallback(
        ({ snapshot, set, reset }) =>
            async (diagramId: string) => {
                reset(DiagramSelectorFamily(diagramId));
                const diagramIds = await snapshot.getPromise(GetAllDiagramIdsSelector);
                const selectDiagramId = diagramIds.filter((id) => id !== diagramId).pop();
                set(CurrentDiagramIdAtom, (current) => {
                    if (current !== diagramId) return current;
                    return selectDiagramId ?? "";
                });
            },
        []
    );
};

/**
 * 構文図式の名前を変更するための関数を使用する
 * @returns 構文図式の名前を変更するための関数
 */
export const useSetDiagramName = () => {
    return useRecoilCallback(
        ({ set }) =>
            (diagramId: string, name: string) => {
                set(DiagramNameSelectorFamily(diagramId), name);
            },
        []
    );
};
