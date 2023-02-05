import { atom, DefaultValue, selector } from "recoil";

import { ID } from "../../features/id/ID";
import { Vector2 } from "../../features/vector2/Vector2";
import {
    DiagramsJsonProperties,
    DiagramsJsonType,
} from "../../types/diagram-editor/DiagramJsonType";
import { LeafType, NodeType } from "../../types/diagram-element/DiagramElementType";
import { DiagramType } from "../../types/diagram/DiagramType";
import { DirectionType } from "../../types/direction/DirectionType";
import {
    ElementSelector,
    GetAllElementStateSelector,
} from "../diagram-element/DiagramElementState";
import {
    DiagramSelectorFamily,
    GetAllDiagramIdsSelector,
    GetAllDiagramStateSelector,
} from "../diagram/DiagramState";
import { DirectionSelectorFamily, GetAllDirectionStateSelector } from "../direction/DirectionState";

/**
 * 現在編集している構文図式のID
 */
export const CurrentDiagramIdAtom = atom({
    key: "CurrentDiagramIdAtom",
    default: "",
});

/**
 * 現在の構文図式における、マウスの座標
 */
export const CurrentDiagramMousePositionAtom = atom({
    key: "CurrentDiagramMousePositionAtom",
    default: new Vector2(0, 0),
});

/**
 * 現在選択している要素のID
 */
export const CurrentSelectElementIdAtom = atom({
    key: "CurrentSelectElementIdAtom",
    default: "",
});

/**
 * 現在の構文図式とJsonType間の変換を行うセレクタ
 */
const DiagramAndJsonTypeSelector = selector({
    key: "DiagramAndJsonTypeSelector",
    get: ({ get }) => {
        const diagramStates = get(GetAllDiagramStateSelector);
        const elementStates = get(GetAllElementStateSelector);
        const directionStates = get(GetAllDirectionStateSelector);
        return <DiagramsJsonType>{
            diagrams: diagramStates,
            elements: elementStates,
            directions: directionStates,
        };
    },
    set: ({ get, set, reset }, diagramsJson) => {
        if (diagramsJson instanceof DefaultValue) return;
        get(GetAllDiagramIdsSelector).forEach((diagramId) => {
            reset(DiagramSelectorFamily(diagramId));
        });

        diagramsJson.diagrams.forEach((aDiagramState) => {
            set(DiagramSelectorFamily(aDiagramState.id), aDiagramState);
        });
        diagramsJson.elements.forEach((anElementState) => {
            set(ElementSelector(anElementState.id), anElementState);
        });
        diagramsJson.directions.forEach((anDirectionState) => {
            set(DirectionSelectorFamily(anDirectionState.id), anDirectionState);
        });
        const aDiagram = diagramsJson.diagrams.at(0);
        const currentDiagramId = aDiagram !== undefined ? aDiagram.id : "";
        set(CurrentDiagramIdAtom, currentDiagramId);
    },
});

/**
 * 文字列のJsonとJsonType間の変換を行うセレクタ
 */
export const DiagramAndJsonSelector = selector({
    key: "DiagramAndJsonSelector",
    get: ({ get }) => {
        return JSON.stringify(get(DiagramAndJsonTypeSelector));
    },
    set: ({ set }, aJson) => {
        if (aJson instanceof DefaultValue) return;
        const idMap = new Map<string, string>();
        const anObject = JSON.parse(aJson, (key, value) => {
            if (value && typeof value === "object") {
                if ("x" in value && "y" in value) {
                    return Vector2.fromJson(value);
                }
            }
            return value;
        });

        const diagrams: Array<DiagramType> = anObject[DiagramsJsonProperties.diagrams];
        const elements: Array<LeafType | NodeType> = anObject[DiagramsJsonProperties.elements];
        const directions: Array<DirectionType> = anObject[DiagramsJsonProperties.directions];

        //IDが重ならないように新しいIDへの射像を作成
        diagrams.forEach((diagram) => idMap.set(diagram.id, ID.getID()));
        elements.forEach((element) => idMap.set(element.id, ID.getID()));
        directions.forEach((direction) => idMap.set(direction.id, ID.getID()));

        const newDiagrams = diagrams.map(
            (diagram) =>
                <DiagramType>{
                    ...diagram,
                    id: idMap.get(diagram.id),
                }
        );
        const newElements = elements.map((element) => {
            let newState = {
                ...element,
                id: idMap.get(element.id),
                diagramId: idMap.get(element.diagramId),
            };
            if ("bindDiagramId" in element) {
                newState = <NodeType>{
                    ...newState,
                    bindDiagramId: idMap.get(element.bindDiagramId),
                };
            }
            return newState;
        });
        const newDirections = directions.map(
            (direction) =>
                <DirectionType>{
                    id: idMap.get(direction.id),
                    fromId: idMap.get(direction.fromId),
                    toId: idMap.get(direction.toId),
                }
        );
        set(DiagramAndJsonTypeSelector, {
            diagrams: newDiagrams,
            elements: newElements,
            directions: newDirections,
        });
    },
});
