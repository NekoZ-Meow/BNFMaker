import React, { useRef } from "react";
import { useRecoilValue } from "recoil";

import { useElementSize } from "../../hooks/useElementSize";
import { GetElementIdsFromDiagramId } from "../../recoil/diagram-element/DiagramElementState";
import { OffsetSelectorFamily } from "../../recoil/diagram/DiagramState";
import { GetDirectionIdsFromDiagramId } from "../../recoil/direction/DirectionState";
import DiagramSVG from "../diagram-editor/styles/DiagramSVG";
import { DiagramElement } from "../diagram-element/DiagramElement";
import { ElementDirection } from "../direction/ElementDirection";
import { NavigationDirection } from "../direction/NavigationDirection";
import { useDiagramState } from "./hooks/useDiagramState";

/**
 * 構文図式を書くためのエレメント
 */
export const Diagram: React.FC<{ diagramId: string }> = React.memo(({ diagramId }) => {
    const divRef = useRef(null);
    const size = useElementSize(divRef);
    const offset = useRecoilValue(OffsetSelectorFamily(diagramId));
    const viewBoxString = `${offset.x} ${offset.y} ${size.x} ${size.y}`;

    const elements = useRecoilValue(GetElementIdsFromDiagramId(diagramId)).map((elementId) => (
        <DiagramElement elementId={elementId} key={elementId}></DiagramElement>
    ));
    const directions = useRecoilValue(GetDirectionIdsFromDiagramId(diagramId)).map(
        (directionId) => (
            <ElementDirection directionId={directionId} key={directionId}></ElementDirection>
        )
    );

    useDiagramState(diagramId, divRef);
    return (
        <div ref={divRef} style={{ width: "100%", height: "100%", position: "relative" }}>
            <DiagramSVG viewBox={viewBoxString}>
                {elements}
                {directions}
                <NavigationDirection></NavigationDirection>
            </DiagramSVG>
        </div>
    );
});
