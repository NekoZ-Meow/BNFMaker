import { atom } from "recoil";

/**
 * 矢印のテーマ
 */
export const DirectionThemeAtom = atom({
    key: "DirectionTheme",
    default: {
        strokeColor: "#000000",
        directionHeadWidth: 5,
        directionHeadHeight: 5,
        carvePointOffset: 15,
    },
});
