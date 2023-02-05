import { Vector2 } from "../../features/vector2/Vector2";
import { DiagramElementKind } from "./DiagramElementKind";

/**
 * 構文図式の要素が持つ状態
 */
export type DiagramElementType = {
    id: string;
    diagramId: string; //このノードが使用されている構文図式のID
    kind: DiagramElementKind;
    position: Vector2;
    canDelete: boolean;
    canDirectionEnter: boolean;
    canDirectionLeave: boolean;
    canDuplicate: boolean;
};

/**
 * 非終端記号が持つ状態
 */
export type NodeType = DiagramElementType & {
    bindDiagramId: string; //このノードに結び付けられている構文図式のID。
};

/**
 * 終端記号が持つ状態
 */
export type LeafType = DiagramElementType & {
    name: string;
};
