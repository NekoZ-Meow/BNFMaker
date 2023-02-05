/**
 * ノードのタイプ
 */
export const DiagramElementKind = {
    Node: "Node",
    Leaf: "Leaf",
    Start: "Start",
    End: "End",
} as const;

export type DiagramElementKind = (typeof DiagramElementKind)[keyof typeof DiagramElementKind];
