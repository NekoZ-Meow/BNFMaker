import React, { useRef } from "react";
import { useRecoilValue } from "recoil";

import { useClick } from "../../hooks/useClick";
import {
    DiagramElementPositionSelectorFamily,
    DiagramElementSizeSelectorFamily,
} from "../../recoil/diagram-element/DiagramElementState";
import { DirectionSelectorFamily } from "../../recoil/direction/DirectionState";
import { useDirectionMenu } from "../context-menu/hooks/useDirectionMenu";
import { Direction } from "./Direction";

/**
 * 要素間を繋ぐ矢印
 */
export const ElementDirection: React.FC<{ directionId: string }> = React.memo(({ directionId }) => {
    const { fromId, toId } = useRecoilValue(DirectionSelectorFamily(directionId));
    const [fromElementPosition, fromElementSize] = [
        useRecoilValue(DiagramElementPositionSelectorFamily(fromId)),
        useRecoilValue(DiagramElementSizeSelectorFamily(fromId)),
    ];
    const [toElementPosition, toElementSize] = [
        useRecoilValue(DiagramElementPositionSelectorFamily(toId)),
        useRecoilValue(DiagramElementSizeSelectorFamily(toId)),
    ];
    const directionRef = useRef(null);
    const { open, menuElement } = useDirectionMenu(directionId);

    /**
     * 右クリックした時、メニューを表示する
     */
    const onMouseRightClick = (event: MouseEvent) => {
        open(event.pageX, event.pageY);
    };

    useClick(directionRef, { onMouseRightClick });

    return (
        <g style={{ pointerEvents: "visibleStroke" }} ref={directionRef}>
            <Direction
                fromRect={{
                    position: fromElementPosition,
                    size: fromElementSize,
                }}
                toRect={{
                    position: toElementPosition,
                    size: toElementSize,
                }}
                key={directionId}
            ></Direction>
            {menuElement}
        </g>
    );
});
