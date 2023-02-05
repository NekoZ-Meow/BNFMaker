import { atom } from "recoil";

/**
 * 変換結果のスタイル
 */
export const ResultViewThemeAtom = atom({
    key: "ResultViewThemeAtom",
    default: {
        cardHeight: 50,
        currentCardBorderColor: "#00ccff",
    },
});
