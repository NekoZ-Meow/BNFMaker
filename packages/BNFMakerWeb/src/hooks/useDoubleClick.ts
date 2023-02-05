import useEvent from "@react-hook/event";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { MouseLeft, MouseRight } from "../constants/MouseButton";

type Props = {
    onMouseLeftDoubleClick?: ((event: MouseEvent) => void) | undefined;
    onMouseRightDoubleClick?: ((event: MouseEvent) => void) | undefined;
};

/**
 * ダブルクリック時の処理を使用する
 * @param ref 対象のオブジェクト
 * @param onMouseLeftDoubleClick 左ダブルクリック時に呼び出される関数
 * @param onMouseRightDoubleClick 右ダブルクリック時に呼び出される関数
 * @param clickable ダブルクリック処理を有効にするか
 */
export const useDoubleClick = (
    ref: RefObject<HTMLElement>,
    { onMouseLeftDoubleClick, onMouseRightDoubleClick }: Props,
    clickable = true
) => {
    const [isClickable, setIsClickable] = useState(clickable);

    /**
     * マウスボタンがダブルクリックされた
     */
    useEvent(ref, "dblclick", (event) => {
        if (!isClickable) return;
        if (event.button === MouseLeft && onMouseLeftDoubleClick !== undefined) {
            onMouseLeftDoubleClick(event);
        } else if (event.button === MouseRight && onMouseRightDoubleClick !== undefined) {
            onMouseRightDoubleClick(event);
        }
    });

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isClickable, setIsClickable];
};
