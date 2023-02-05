import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { RowFlexBox } from "../../styles/flex-box/RowFlexBox";
import { ArrayUtility } from "../../utils/ArrayUtility";
import { RowSeparateLine } from "./RowSeparateLine";

/**
 * 横方向に大きさを変更できるグリッドを表すコンポーネント
 */
export const RowResizableBox: React.FC<{
    children: ReactNode;
}> = React.memo(({ children }) => {
    const containerRef = useRef(null);
    const numberOfChildren = React.Children.count(children);
    const [widthArray, setWidthArray] = useState(new Array<number>(numberOfChildren).fill(0));
    const containerSize = useElementSize(containerRef);
    const minElementSize = containerSize.x * 0.3;

    /**
     * 分割している線を移動する
     */
    const moveSeparateLine = useCallback(
        (index: number) => (moveX: number) => {
            if (index + 1 >= numberOfChildren) return;
            setWidthArray((current) => {
                if (
                    current[index] + moveX < minElementSize ||
                    current[index + 1] - moveX < minElementSize
                ) {
                    return current;
                }
                current[index] = Math.max(current[index] + moveX, minElementSize);
                current[index + 1] = Math.max(current[index + 1] - moveX, minElementSize);
                return [...current];
            });
        },
        [numberOfChildren, minElementSize]
    );

    /**
     * コンテナの大きさが変更された
     */
    useEffect(() => {
        setWidthArray((current) => {
            if (numberOfChildren === 0) return;
            const sumOfWidth = ArrayUtility.sum(current);
            //初期化処理
            if (sumOfWidth === 0) {
                return current.map(() =>
                    Math.max(containerSize.x / numberOfChildren, minElementSize)
                );
            }
            const changeRate = containerSize.x / sumOfWidth;
            const newWidthArray = current.map((width) =>
                Math.max(width * changeRate, minElementSize)
            );
            const diff = containerSize.x - ArrayUtility.sum(newWidthArray);
            newWidthArray[numberOfChildren - 1] = Math.max(
                newWidthArray[numberOfChildren - 1] + diff,
                minElementSize
            );
            return newWidthArray;
        });
    }, [containerSize, numberOfChildren, minElementSize]);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <RowFlexBox>
                {React.Children.map(children, (child, index) => {
                    return (
                        <>
                            <div
                                style={{
                                    width: `${widthArray[index]}px`,
                                    height: "100%",
                                }}
                            >
                                {child}
                            </div>
                            {index === numberOfChildren - 1 ? (
                                <></>
                            ) : (
                                <RowSeparateLine
                                    moveSeparateLine={moveSeparateLine(index)}
                                ></RowSeparateLine>
                            )}
                        </>
                    );
                })}
            </RowFlexBox>
        </div>
    );
});
