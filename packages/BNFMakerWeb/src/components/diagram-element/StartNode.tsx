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
 * 開始記号を表すノード
 */
export const StartNode: React.FC<{ elementId: string }> = ({ elementId }) => {
    const elementTheme = useRecoilValue(ElementThemeAtom);
    const elementContainerRef = useRef(null);
    const elementRectRef = useRef(null);
    const position = useRecoilValue(DiagramElementPositionSelectorFamily(elementId));
    const size = useRecoilValue(DiagramElementSizeSelectorFamily(elementId));
    const { menuElement } = useElementControl(elementId, elementContainerRef, elementRectRef);
    useDiagramElementDragMove(elementId, elementRectRef);

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
                <path d={`M 0 0 l 0 ${size.y} l ${size.x} ${-Math.round(size.y / 2)}`}></path>
            </g>
            {menuElement}
        </g>
    );
};
