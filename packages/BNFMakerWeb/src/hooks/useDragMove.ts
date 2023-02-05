import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

import useEvent from "@react-hook/event";

import { MouseLeft } from "../constants/MouseButton";

type Props = {
    onMouseDrag?: ((event: MouseEvent) => void) | undefined;
    onMouseDown?: ((event: MouseEvent) => void) | undefined;
    onMouseUp?: ((event: MouseEvent) => void) | undefined;
    draggable?: boolean;
};

/**
 * 要素をドラッグしながらマウスを動かした時の処理を使用する(drag and drop イベントを使用するわけではない)
 * @param ref 対象のオブジェクト
 * @param onMouseDrag ドラッグ時に呼び出される関数
 * @param onMouseDown マウスが押された時
 * @param onMouseUp マウスが離された時
 * @param draggable ドラッグ処理を有効にするか
 */
export const useDragMove = (
    ref: RefObject<HTMLElement>,
    { onMouseDrag, onMouseDown, onMouseUp, draggable = true }: Props
) => {
    const [isDraggable, setIsDraggable] = useState(draggable);
    const isMouseDown = useRef<boolean>(false);

    /**
     * クリックまたはタッチしながらが移動した
     */
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (onMouseDrag !== undefined && isMouseDown.current && isDraggable) {
                onMouseDrag(event);
            }
        };
        window.addEventListener("mousemove", handler);
        //window.addEventListener("touchmove", handler);
        return () => {
            window.removeEventListener("mousemove", handler);
            //window.removeEventListener("touchmove", handler);
        };
    }, [isDraggable, isMouseDown, onMouseDrag]);

    /**
     * 左のマウスボタンが押されたまたはスクリーンがタッチされた
     */
    useEvent(ref, "mousedown", (event) => {
        if (event.button !== MouseLeft) return;
        isMouseDown.current = true;
        if (onMouseDown !== undefined) {
            onMouseDown(event);
        }
    });

    /**
     * 左クリックおよびタッチが解除された
     */
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            event.preventDefault();
            if (isMouseDown.current && onMouseUp !== undefined) {
                onMouseUp(event);
            }
            isMouseDown.current = false;
        };
        window.addEventListener("mouseup", handler);
        //window.addEventListener("touchend", handler);
        return () => {
            window.removeEventListener("mouseup", handler);
            //window.removeEventListener("touchend", handler);
        };
    }, [isDraggable, isMouseDown, onMouseUp]);

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isDraggable, setIsDraggable];
};
