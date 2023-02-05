import { DiagramElementType } from "../diagram-element/DiagramElementType";
import { DiagramType } from "../diagram/DiagramType";
import { DirectionType } from "../direction/DirectionType";

/**
 * 構文図式のJSONが持つプロパティの名前
 * キー名だけを取得したい時などに使用
 */
export const DiagramsJsonProperties = {
    diagrams: "diagrams",
    elements: "elements",
    directions: "directions",
};

/**
 * 構文図式のJSONが持つプロパティ
 */
export type DiagramsJsonType = {
    diagrams: Array<DiagramType>;
    elements: Array<DiagramElementType>;
    directions: Array<DirectionType>;
};
