import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import { useDragMove } from "../../hooks/useDragMove";
import { GlobalThemeAtom } from "../../recoil/theme/GlobalTheme";

/**
 * RowResizableBoxの各要素を分割するための線
 * 要素の大きさを変更する操作ができる
 */
export const RowSeparateLine: React.FC<{
    moveSeparateLine: (moveX: number) => void;
}> = React.memo(({ moveSeparateLine }) => {
    const width = 2;
    const separateLineRef = useRef(null);
    const { borderColor } = useRecoilValue(GlobalThemeAtom);

    /**
     * 線をドラッグした時大きさを変更する
     */
    useDragMove(separateLineRef, {
        onMouseDrag: (event) => {
            moveSeparateLine(event.movementX);
        },
    });

    return (
        <div
            ref={separateLineRef}
            style={{
                height: "100%",
                borderWidth: `0 ${width}px 0 0`,
                borderColor: borderColor,
                borderStyle: "solid",
                cursor: "col-resize",
            }}
            draggable={false}
        ></div>
    );
});
