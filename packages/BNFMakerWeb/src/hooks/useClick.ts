import { Dispatch, RefObject, SetStateAction, useState } from "react";

import useEvent from "@react-hook/event";

import { MouseLeft } from "../constants/MouseButton";

type Props = {
    onMouseLeftClick?: ((event: MouseEvent) => void) | undefined;
    onMouseRightClick?: ((event: MouseEvent) => void) | undefined;
};

/**
 * クリック時の処理を使用する
 * @param ref 対象のオブジェクト
 * @param onMouseLeftClick 左クリック時に呼び出される関数
 * @param onMouseRightClick 右クリック時に呼び出される関数
 * @param clickable クリック処理を有効にするか
 */
export const useClick = (
    ref: RefObject<HTMLElement>,
    { onMouseLeftClick, onMouseRightClick }: Props,
    clickable = true
) => {
    const [isClickable, setIsClickable] = useState(clickable);

    /**
     * 右クリックのイベント
     * マウスの右ボタンでは反応しないのでコンテキストメニュー
     */
    useEvent(ref, "contextmenu", (event) => {
        if (onMouseRightClick !== undefined) {
            event.preventDefault();
            onMouseRightClick(event);
        }
    });

    /**
     * マウスボタンがクリックされた
     */
    useEvent(ref, "click", (event) => {
        if (!isClickable) return;
        if (event.button === MouseLeft) {
            if (onMouseLeftClick !== undefined) {
                onMouseLeftClick(event);
            }
        }
    });

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isClickable, setIsClickable];
};
