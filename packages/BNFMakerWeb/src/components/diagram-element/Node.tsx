import { useRef } from "react";
import { useRecoilValue } from "recoil";

import {
    DiagramElementNameSelectorFamily,
    DiagramElementPositionSelectorFamily,
    DiagramElementSizeSelectorFamily,
} from "../../recoil/diagram-element/DiagramElementState";
import { ElementThemeAtom } from "../../recoil/theme/ElementTheme";
import { CenterDiv } from "../../styles/Alignment";
import { CreateDirectionButton } from "../buttons/direction/CreateDirectionButton";
import { useDiagramElementDragMove } from "./hooks/useDiagramElementDragMove";
import { useElementControl } from "./hooks/useElementControl";
import { DiagramElementInput } from "./styles/DiagramElementStyle";

/**
 * 非終端記号を表すノード
 */
const Node: React.FC<{ elementId: string }> = ({ elementId }) => {
    const elementTheme = useRecoilValue(ElementThemeAtom);
    const elementContainerRef = useRef(null);
    const elementRectRef = useRef(null);
    const position = useRecoilValue(DiagramElementPositionSelectorFamily(elementId));
    const name = useRecoilValue(DiagramElementNameSelectorFamily(elementId));
    const size = useRecoilValue(DiagramElementSizeSelectorFamily(elementId));
    const { menuElement } = useElementControl(elementId, elementContainerRef, elementRectRef);

    useDiagramElementDragMove(elementId, elementRectRef);
    return (
        <g
            fill={elementTheme.elementFillColor}
            stroke={elementTheme.elementStrokeColor}
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
                <rect x="0" y="0" width={size.x} height={size.y}></rect>
                <foreignObject width={size.x} height={size.y} overflow="visible">
                    <CenterDiv>
                        <DiagramElementInput
                            width={size.x - 10}
                            height={size.y * 0.5}
                            fontSizePx={elementTheme.elementSize}
                            backGroundColor={elementTheme.elementFillColor}
                            type="text"
                            value={name}
                            draggable="false"
                            readOnly={true}
                        ></DiagramElementInput>
                    </CenterDiv>
                </foreignObject>
            </g>
            {menuElement}
        </g>
    );
};

export default Node;
