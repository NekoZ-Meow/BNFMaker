import useEvent from "@react-hook/event";
import { Dispatch, RefObject, SetStateAction, useState } from "react";

type Props = {
    onMouseEnter?: ((event: MouseEvent) => void) | undefined;
    onMouseLeave?: ((event: MouseEvent) => void) | undefined;
    onMouseMove?: ((event: MouseEvent) => void) | undefined;
};

/**
 * ホバー時の処理を使用する
 * @param ref 対象のオブジェクト
 * @param onMouseHover マウスが入った時
 * @param onMouseLeave マウスが出た時
 * @param enable ホバー処理を有効にするか
 */
export const useHover = (
    ref: RefObject<HTMLElement>,
    { onMouseEnter, onMouseLeave, onMouseMove }: Props,
    enable = true
) => {
    const [isEnable, setIsEnable] = useState(enable);

    /**
     * マウスボタンが入った
     */
    useEvent(ref, "mouseenter", (event) => {
        if (!isEnable) return;
        if (onMouseEnter === undefined) return;
        onMouseEnter(event);
    });

    /**
     * マウスボタンが出た
     */
    useEvent(ref, "mouseleave", (event) => {
        if (!isEnable) return;
        if (onMouseLeave === undefined) return;
        onMouseLeave(event);
    });

    /**
     * 要素上でマウスが動いた時
     */
    useEvent(ref, "mousemove", (event) => {
        if (!isEnable) return;
        if (onMouseMove === undefined) return;
        onMouseMove(event);
    });

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isEnable, setIsEnable];
};
