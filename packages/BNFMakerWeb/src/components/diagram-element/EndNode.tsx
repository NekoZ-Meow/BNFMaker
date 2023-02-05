import { useRef } from "react";
import { useRecoilValue } from "recoil";

import {
    DiagramElementPositionSelectorFamily,
    DiagramElementSizeSelectorFamily,
} from "../../recoil/diagram-element/DiagramElementState";
import { ElementThemeAtom } from "../../recoil/theme/ElementTheme";
import { CreateDirectionButton } from "../buttons/direction/CreateDirectionButton";
import { useDiagramElementDragMove } from "./hooks/useDiagramElementDragMove";
import { useElementControl } from "./hooks/useElementControl";

/**
 * 終了記号を表すノード
 */
export const EndNode: React.FC<{ elementId: string }> = ({ elementId }) => {
    const elementTheme = useRecoilValue(ElementThemeAtom);
    const elementContainerRef = useRef(null);
    const elementRectRef = useRef(null);
    const position = useRecoilValue(DiagramElementPositionSelectorFamily(elementId));
    const size = useRecoilValue(DiagramElementSizeSelectorFamily(elementId));
    const { menuElement } = useElementControl(elementId, elementContainerRef, elementRectRef);
    useDiagramElementDragMove(elementId, elementRectRef);

    const outsideDiameter = size;
    const outsideRadius = outsideDiameter.div(2);
    const insideDiameter = outsideDiameter.mul(0.7);
    const insideRadius = insideDiameter.div(2);

    return (
        <g
            fill={elementTheme.startAndEndNodeColor}
            stroke={elementTheme.startAndEndNodeColor}
            transform={`translate(${position.x} ${position.y})`}
            id={`${elementId}`}
            ref={elementContainerRef}
        >
            <CreateDirectionButton
                elementId={elementId}
                elementRef={elementContainerRef}
            ></CreateDirectionButton>
            {/* Node Rectangle */}
            <g ref={elementRectRef}>
                <ellipse
                    cx={outsideRadius.x}
                    cy={outsideRadius.y}
                    rx={outsideRadius.x}
                    ry={outsideRadius.y}
                    width={outsideDiameter.x}
                    height={outsideDiameter.y}
                    fillOpacity={0}
                    strokeOpacity={1}
                ></ellipse>
                <ellipse
                    cx={outsideRadius.x}
                    cy={outsideRadius.y}
                    rx={insideRadius.x}
                    ry={insideRadius.y}
                    width={insideDiameter.x}
                    height={insideDiameter.y}
                ></ellipse>
            </g>
            {menuElement}
        </g>
    );
};
