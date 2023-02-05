import { Dispatch, RefObject, SetStateAction, useState } from "react";

import useEvent from "@react-hook/event";

type Props = {
    onDrop?: ((event: DragEvent) => void) | undefined;
    onDragEnter?: ((event: DragEvent) => void) | undefined;
    onDragLeave?: ((event: DragEvent) => void) | undefined;
    onDragOver?: ((event: DragEvent) => void) | undefined;
};

/**
 * ドロップ時の処理を使用する
 * @param ref 対象のオブジェクト
 * @param onDrop ドロップされた時の処理
 * @param onDragEnter ドラッグ可能な要素が入った時の処理
 * @param onDragLeave ドラッグ可能な要素が出た時の処理
 * @param onDragOver ドラッグ可能な要素が中に入っている間実行する処理
 * @param droppable ドロップ処理を有効にするか
 */
export const useDrop = (
    ref: RefObject<HTMLElement>,
    { onDrop, onDragEnter, onDragLeave, onDragOver }: Props,
    droppable = true
) => {
    const [isDroppable, setIsDroppable] = useState(droppable);

    /**
     * ドラッグ可能な要素が中に入っている間実行する処理
     */
    useEvent(ref, "dragover", (event) => {
        if (!isDroppable) return;
        if (onDrop !== undefined || onDragOver !== undefined) {
            event.preventDefault();
        }
        if (onDragOver !== undefined) {
            onDragOver(event);
        }
    });

    /**
     * ドロップされた
     */
    useEvent(ref, "drop", (event) => {
        if (!isDroppable) return;
        if (onDrop !== undefined) {
            onDrop(event);
        }
    });

    /**
     * ドラッグ可能な要素が入った
     */
    useEvent(ref, "dragenter", (event) => {
        if (!isDroppable) return;
        if (onDragEnter !== undefined) {
            onDragEnter(event);
        }
    });

    /**
     * ドラッグ可能な要素が出た
     */
    useEvent(ref, "dragleave", (event) => {
        if (!isDroppable) return;
        if (onDragLeave !== undefined) {
            onDragLeave(event);
        }
    });

    /**
     * ドラッグ可能な要素が中に入っている
     */
    useEvent(ref, "dragover", (event) => {
        if (!isDroppable) return;
        if (onDragOver !== undefined) {
            onDragOver(event);
        }
    });

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isDroppable, setIsDroppable];
};
