import React from "react";
import { useRecoilValue } from "recoil";

import { ElementSelector } from "../../recoil/diagram-element/DiagramElementState";
import { DiagramElementKind } from "../../types/diagram-element/DiagramElementKind";
import { EndNode } from "./EndNode";
import Leaf from "./Leaf";
import Node from "./Node";
import { StartNode } from "./StartNode";

/**
 * ノードIDを受け取り、終端ノードか非終端ノードになる抽象コンポーネント
 */
export const DiagramElement: React.FC<{ elementId: string }> = React.memo(({ elementId }) => {
    const { kind } = useRecoilValue(ElementSelector(elementId));
    let reactElement: JSX.Element = null;
    if (kind === DiagramElementKind.Node) {
        reactElement = <Node elementId={elementId} key={elementId}></Node>;
    } else if (kind === DiagramElementKind.Leaf) {
        reactElement = <Leaf elementId={elementId} key={elementId}></Leaf>;
    } else if (kind === DiagramElementKind.Start) {
        reactElement = <StartNode elementId={elementId} key={elementId}></StartNode>;
    } else if (kind === DiagramElementKind.End) {
        reactElement = <EndNode elementId={elementId} key={elementId}></EndNode>;
    }

    return reactElement;
});
