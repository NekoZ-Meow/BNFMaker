import { atom } from "recoil";

/**
 * 構文図式操作のためのツールバーのテーマ
 */
export const ControlToolbarThemeAtom = atom({
    key: "ControlToolbarThemeAtom",
    default: {
        backGroundColor: "#ffffff",
        heightPx: 30,
        buttonColor: "#505050",
        buttonSizePx: 15,
    },
});

/**
 * 構文図式選択のためのツールバーのテーマ
 */
export const SelectToolbarThemeAtom = atom({
    key: "SelectToolbarThemeAtom",
    default: {
        backGroundColor: "#e7e7e7",
        selectedTabColor: "#ffffff",
        maxTabWidthPx: 100,
        heightPx: 50,
        buttonSizePx: 15,
    },
});
