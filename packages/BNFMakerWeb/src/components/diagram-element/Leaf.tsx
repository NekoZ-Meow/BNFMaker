import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { useCommandDo } from "../../features/command/useCommand";
import {
    DiagramElementNameSelectorFamily,
    DiagramElementPositionSelectorFamily,
    DiagramElementSizeSelectorFamily,
} from "../../recoil/diagram-element/DiagramElementState";
import { ElementThemeAtom } from "../../recoil/theme/ElementTheme";
import { CenterDiv } from "../../styles/Alignment";
import { CreateDirectionButton } from "../buttons/direction/CreateDirectionButton";
import { useSetElementNameCommand } from "./hooks/commands/useSetElementNameCommand";
import { useDiagramElementDragMove } from "./hooks/useDiagramElementDragMove";
import { useElementControl } from "./hooks/useElementControl";
import { DiagramElementInput } from "./styles/DiagramElementStyle";

/**
 * 終端記号を表すノード
 */
const Leaf: React.FC<{ elementId: string }> = ({ elementId }) => {
    const elementTheme = useRecoilValue(ElementThemeAtom);
    const elementContainerRef = useRef(null);
    const elementRectRef = useRef(null);
    const nameInputRef = useRef(null);
    const position = useRecoilValue(DiagramElementPositionSelectorFamily(elementId));
    const name = useRecoilValue(DiagramElementNameSelectorFamily(elementId));
    const size = useRecoilValue(DiagramElementSizeSelectorFamily(elementId));
    const { menuElement } = useElementControl(elementId, elementContainerRef, elementRectRef);
    const commandDo = useCommandDo();
    const setNameCommand = useSetElementNameCommand();
    useDiagramElementDragMove(elementId, elementRectRef);

    /**
     * 名前が変更された際に入力欄の文字を設定する
     */
    useEffect(() => {
        nameInputRef.current.value = name;
    }, [name]);

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
                <rect x="0" y="0" width={size.x} height={size.y} rx="10" ry="30"></rect>
                <foreignObject width={size.x} height={size.y} overflow="visible">
                    <CenterDiv>
                        <DiagramElementInput
                            ref={nameInputRef}
                            width={size.x - 10}
                            height={size.y * 0.5}
                            fontSizePx={elementTheme.elementSize}
                            backGroundColor={elementTheme.elementFillColor}
                            type="text"
                            onChange={async (event) => {
                                event.preventDefault();
                                commandDo(await setNameCommand(elementId, event.target.value));
                            }}
                            draggable="false"
                        ></DiagramElementInput>
                    </CenterDiv>
                </foreignObject>
            </g>
            {menuElement}
        </g>
    );
};

export default Leaf;
