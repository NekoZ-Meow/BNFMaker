import {
    atom,
    atomFamily,
    DefaultValue,
    selector,
    selectorFamily,
    useRecoilCallback,
} from "recoil";

import { DirectionType } from "../../types/direction/DirectionType";
import { GetElementIdsFromDiagramId } from "../diagram-element/DiagramElementState";

/**
 * 矢印のIDを記録する
 */
const DirectionIdsAtom = atom({
    key: "DirectionIdsAtom",
    default: new Set<string>(),
});

/**
 * 矢印の状態を表すアトム
 */
const DirectionAtomFamily = atomFamily<DirectionType, string>({
    key: "DirectionAtomFamily",
    default: {
        id: "",
        fromId: "",
        toId: "",
    },
});

/**
 * 矢印の状態を管理するセレクター
 */
export const DirectionSelectorFamily = selectorFamily<DirectionType, string>({
    key: "DirectionsSelector",
    get:
        (id) =>
        ({ get }) => {
            const atom = get(DirectionAtomFamily(id));
            return atom;
        },

    set:
        (id) =>
        ({ set, reset }, directionState) => {
            if (directionState instanceof DefaultValue) {
                reset(DirectionAtomFamily(id));
                set<Set<string>>(DirectionIdsAtom, (oldValue) => {
                    oldValue.delete(id);
                    return new Set<string>(oldValue);
                });
                return;
            }
            set<DirectionType>(DirectionAtomFamily(id), directionState);

            // IDが存在していた場合は更新しない
            set<Set<string>>(DirectionIdsAtom, (oldValue) => {
                if (oldValue.has(id)) return oldValue;
                oldValue.add(id);
                return new Set<string>(oldValue);
            });
        },
});

/**
 * 矢印のIDの配列を管理するセレクター
 */
export const DirectionIdsSelector = selector<Array<string>>({
    key: "DirectionIdsSelector",
    get: ({ get }) => {
        return Array.from(get(DirectionIdsAtom));
    },
});

/**
 * 全ての矢印の状態を配列で取得するセレクター
 * パフォーマンス注意
 */
export const GetAllDirectionStateSelector = selector<Array<DirectionType>>({
    key: "GetAllDirectionStateSelector",
    get: ({ get }) => {
        return get(DirectionIdsSelector).map((directionId) =>
            get(DirectionSelectorFamily(directionId))
        );
    },
});

/**
 * 構文図式のIDからその構文図式で使用されている矢印のIDを配列にして返すセレクター
 */
export const GetDirectionIdsFromDiagramId = selectorFamily<Array<string>, string>({
    key: "GetDirectionIdsFromDiagramId",
    get:
        (diagramId: string) =>
        ({ get }) => {
            const elementIds = new Set(get(GetElementIdsFromDiagramId(diagramId)));
            return get(GetAllDirectionStateSelector).flatMap((directionState) => {
                if (elementIds.has(directionState.fromId) || elementIds.has(directionState.toId)) {
                    return directionState.id;
                }
                return [];
            });
        },
});

/**
 * ノードIDからそのノードに接続している矢印のIDを配列にして返すセレクター
 */
export const GetDirectionIdsFromElementId = selectorFamily<Array<string>, string>({
    key: "GetDirectionIdsFromElementId",
    get:
        (elementId: string) =>
        ({ get }) => {
            return get(GetAllDirectionStateSelector).flatMap((directionState) => {
                if (elementId === directionState.fromId || elementId === directionState.toId) {
                    return [directionState.id];
                }
                return [];
            });
        },
});

/**
 * 矢印を生成する関数を使用する
 * @returns 矢印を生成する関数
 */
export const useCreateDirection = () => {
    return useRecoilCallback(
        ({ set }) =>
            (directionId: string, fromElementId: string, toElementId: string) => {
                set(DirectionSelectorFamily(directionId), {
                    id: directionId,
                    fromId: fromElementId,
                    toId: toElementId,
                });
            },
        []
    );
};

/**
 * 矢印を削除する関数を使用する
 * @returns 矢印を削除する関数
 */
export const useDeleteDirection = () => {
    return useRecoilCallback(
        ({ reset }) =>
            (directionId: string) => {
                reset(DirectionSelectorFamily(directionId));
            },

        []
    );
};
