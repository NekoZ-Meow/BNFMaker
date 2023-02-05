import React from "react";
import { useRecoilValue } from "recoil";

import { NavigationDirectionSelector } from "../../recoil/direction/NavigationDirectionState";
import { BooleanSelector } from "../selector/BooleanSelector";
import { Direction } from "./Direction";

/**
 * 矢印を引く際の見本となる矢印
 */
export const NavigationDirection = React.memo(() => {
    const { fromRectangle, toRectangle } = useRecoilValue(NavigationDirectionSelector);

    return (
        <g style={{ pointerEvents: "none" }}>
            <BooleanSelector
                value={fromRectangle === null || toRectangle === null}
                onTrue={null}
                onFalse={
                    <Direction fromRect={fromRectangle} toRect={toRectangle} key="-1"></Direction>
                }
            ></BooleanSelector>
        </g>
    );
});
