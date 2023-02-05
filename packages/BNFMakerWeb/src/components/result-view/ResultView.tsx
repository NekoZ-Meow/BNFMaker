import React, { useRef } from "react";
import { useRecoilValue } from "recoil";

import { useElementSize } from "../../hooks/useElementSize";
import { GetAllDiagramIdsSelector } from "../../recoil/diagram/DiagramState";
import { ColumnFlexBox } from "../../styles/flex-box/ColumnFlexBox";
import { EBNFResultCard } from "./EBNFResultCard";

/**
 * 変換結果を表示するウィンドウ
 */
export const ResultView = React.memo(() => {
    const diagramIds = useRecoilValue(GetAllDiagramIdsSelector);
    const boxRef = useRef(null);
    const size = useElementSize(boxRef);

    return (
        <div ref={boxRef}>
            <ColumnFlexBox style={{ maxHeight: size.y }}>
                {diagramIds.map((diagramId) => {
                    return (
                        <EBNFResultCard
                            diagramId={diagramId}
                            key={`Card:${diagramId}`}
                        ></EBNFResultCard>
                    );
                })}
            </ColumnFlexBox>
        </div>
    );
});
