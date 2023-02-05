import { atom } from "recoil";

/**
 * 構文図式の要素のテーマ
 */
export const ElementThemeAtom = atom({
    key: "ElementThemeAtom",
    default: {
        startAndEndNodeColor: "#000000",
        elementStrokeColor: "#000000",
        elementFillColor: "#FFF6D1",
        directionLight: "#00ccff",
        directionDark: "#0098cb",
        elementSize: 14,
    },
});
