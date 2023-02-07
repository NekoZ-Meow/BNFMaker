import { MutableRefObject, useRef } from "react";
import { useRecoilValue } from "recoil";

import ForwardIcon from "@mui/icons-material/Forward";

import { DiagramElementSizeSelectorFamily } from "../../../recoil/diagram-element/DiagramElementState";
import { useCreateDirectionButtonState } from "./useCreateDirectionButtonState";

type Props = {
    elementId: string;
    elementRef: MutableRefObject<null>;
};

/**
 * ノード間を繋ぐ矢印を作るためのボタン
 */
export const CreateDirectionButton: React.FC<Props> = ({ elementId, elementRef }) => {
    const ref = useRef(null);
    const { isVisible, color } = useCreateDirectionButtonState(elementId, elementRef, ref);

    const size = useRecoilValue(DiagramElementSizeSelectorFamily(elementId));

    return (
        <g
            visibility={isVisible ? "visible" : "hidden"}
            style={{ pointerEvents: "visible" }}
            transform={`translate(${size.x} ${size.y / 2 - 10})`}
        >
            <ForwardIcon
                ref={ref}
                inheritViewBox={true}
                sx={{
                    fontSize: 20,
                    color: color,
                    border: 0,
                    strokeWidth: 0,
                    opacity: 0.5,
                    textAlign: "center",
                    margin: 0,
                    padding: 0,
                }}
            ></ForwardIcon>
        </g>
    );
};
