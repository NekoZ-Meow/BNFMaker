import React from "react";
import { useRecoilValue } from "recoil";

import { Vector2 } from "../../features/vector2/Vector2";
import { DirectionThemeAtom } from "../../recoil/theme/DirectionTheme";
import { Rectangle } from "../../types/rectangle/Rectangle";

type Props = {
    fromRect: Rectangle;
    toRect: Rectangle;
};

/**
 * 矢印のエレメント
 */
export const Direction: React.FC<Props> = React.memo(({ fromRect, toRect }) => {
    const from = {
        x: fromRect.position.x + fromRect.size.x,
        y: fromRect.position.y + fromRect.size.y / 2,
    };
    const to = {
        x: toRect.position.x,
        y: toRect.position.y + toRect.size.y / 2,
    };
    const directionTheme = useRecoilValue(DirectionThemeAtom);

    /**
     * 曲線の文字列を生成する
     * @param controlPoint 制御点
     * @param toPoint 終点
     * @returns 曲線の文字列
     */
    const createCurveString = (controlPoint: Vector2, toPoint: Vector2) => {
        return `q ${controlPoint.x} ${controlPoint.y}, ${toPoint.x} ${toPoint.y}`;
    };

    /**
     * 矢印の曲線を生成する
     */
    const createPathString = () => {
        const aBuilder = new Array<string>();
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        let horizontalAmount = 0;
        let verticalAmount = yDiff / 2;
        const isHeightOverlap = Math.abs(yDiff) <= (fromRect.size.y + toRect.size.y) / 2;
        let isLoopType = false;
        if (isHeightOverlap && xDiff < 0) {
            verticalAmount = yDiff + (yDiff <= 0 ? -1 : 1) * toRect.size.y;
            isLoopType = true;
        }

        let offset = Math.min(directionTheme.carvePointOffset, Math.abs(verticalAmount) / 2);
        if (Math.abs(verticalAmount) < offset * 2 && xDiff >= 0) {
            offset = Math.min(offset, xDiff / 2);
        }
        const isToBeforeFrom = xDiff - offset * 2 <= 0;
        if (isToBeforeFrom) {
            horizontalAmount = xDiff - offset;
        }
        horizontalAmount = Math.min(0, horizontalAmount);
        const verticalOffset = offset * (verticalAmount < 0 ? -1 : 1);

        /**
         * 描画
         */
        aBuilder.push(`M ${from.x} ${from.y}`);
        aBuilder.push(
            createCurveString(new Vector2(offset, 0), new Vector2(offset, verticalOffset))
        );
        // 終了点が後ろにあるので、平行線を戻す
        if (isToBeforeFrom) {
            aBuilder.push(`v ${verticalAmount - verticalOffset * 2}`);
            aBuilder.push(
                createCurveString(
                    new Vector2(0, verticalOffset),
                    new Vector2(-offset, verticalOffset)
                )
            );
            aBuilder.push(`h ${horizontalAmount}`);
            aBuilder.push(
                createCurveString(
                    new Vector2(-offset, 0),
                    new Vector2(-offset, verticalOffset * (isLoopType ? -1 : 1))
                )
            );
        }
        aBuilder.push(`V ${to.y - verticalOffset * (isLoopType ? -1 : 1)}`);
        aBuilder.push(
            createCurveString(
                new Vector2(0, verticalOffset * (isLoopType ? -1 : 1)),
                new Vector2(offset, verticalOffset * (isLoopType ? -1 : 1))
            )
        );
        aBuilder.push(`L ${to.x} ${to.y}`);
        return aBuilder.join(" ");
    };

    /**
     * 矢印の先を生成する
     */
    const createDirectionHeadString = () => {
        const width = directionTheme.directionHeadWidth;
        const height = directionTheme.directionHeadHeight;
        return `M ${to.x} ${to.y} L ${to.x - width} ${to.y - height} L ${to.x - width} ${
            to.y + height
        }`;
    };

    return (
        <>
            <path
                d={createPathString()}
                stroke={directionTheme.strokeColor}
                fill="transparent"
            ></path>
            <path
                d={createDirectionHeadString()}
                stroke={directionTheme.strokeColor}
                fill={directionTheme.strokeColor}
            ></path>
        </>
    );
});
