import { Dispatch, RefObject, SetStateAction, useState } from "react";

import useEvent from "@react-hook/event";

type Props = {
    onDragStart?: ((event: DragEvent) => void) | undefined;
    onDragging?: ((event: DragEvent) => void) | undefined;
    onDragEnd?: ((event: DragEvent) => void) | undefined;
};

/**
 * ドラッグ時の処理を使用する
 * @param ref 対象のオブジェクト
 * @param onDragStart ドラッグを開始した時の処理
 * @param onDragging ドラッグ中の処理
 * @param onDragEnd ドラッグが終了した時の処理
 * @param draggable ドラッグ処理を有効にするか
 */
export const useDrag = (
    ref: RefObject<HTMLElement>,
    { onDragStart, onDragging, onDragEnd }: Props,
    draggable = true
) => {
    const [isDraggable, setIsDraggable] = useState(draggable);
    if (ref.current !== null) {
        ref.current.setAttribute("draggable", isDraggable ? "true" : "false");
    }

    /**
     * ドラッグが開始された
     */
    useEvent(ref, "dragstart", (event) => {
        if (!isDraggable) return;
        if (onDragStart !== undefined) {
            onDragStart(event);
        }
    });

    /**
     * ドラッグ中の処理
     */
    useEvent(ref, "drag", (event) => {
        if (!isDraggable) return;
        if (onDragging !== undefined) {
            onDragging(event);
        }
    });

    /**
     * ドラッグが終了された
     */
    useEvent(ref, "dragend", (event) => {
        if (!isDraggable) return;
        if (onDragEnd !== undefined) {
            onDragEnd(event);
        }
    });

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isDraggable, setIsDraggable];
};
