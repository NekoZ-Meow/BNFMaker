import {
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { MouseLeft } from "../constants/MouseButton";
import { Vector2 } from "../features/vector2/Vector2";

type Props = {
    onMouseDrag?:
        | (({ event, movement }: { event: MouseEvent | TouchEvent; movement: Vector2 }) => void)
        | undefined;
    onMouseDown?: (({ event }: { event: MouseEvent | TouchEvent }) => void) | undefined;
    onMouseUp?:
        | (({ event, movement }: { event: MouseEvent | TouchEvent; movement: Vector2 }) => void)
        | undefined;
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
    const beforePositionRef = useRef<Vector2>(new Vector2(0, 0));

    /**
     * 現在の座標をイベントから取得する
     */
    const getCurrentPositionFromEvent = useCallback((event: MouseEvent | TouchEvent) => {
        if (event instanceof MouseEvent) {
            return new Vector2(event.screenX, event.screenY);
        }
        if (event instanceof TouchEvent) {
            const touch = event.touches[0];
            return new Vector2(touch.screenX, touch.screenY);
        }
    }, []);

    /**
     * イベントから座標の変化量
     */
    const getMovement = useCallback(
        (event: MouseEvent | TouchEvent) => {
            const currentPosition = getCurrentPositionFromEvent(event);
            const beforePosition = beforePositionRef.current;
            beforePositionRef.current = currentPosition;
            return currentPosition.sub(beforePosition);
        },
        [getCurrentPositionFromEvent, beforePositionRef]
    );

    /**
     * クリックまたはタッチしながらが移動した
     */
    useEffect(() => {
        const abortController = new AbortController();
        const handler = (event: MouseEvent | TouchEvent) => {
            if (onMouseDrag !== undefined && isMouseDown.current && isDraggable) {
                onMouseDrag({
                    event,
                    movement: getMovement(event),
                });
            }
        };
        window.addEventListener("mousemove", handler, {
            signal: abortController.signal,
        });
        window.addEventListener("touchmove", handler, {
            signal: abortController.signal,
        });
        return () => {
            abortController.abort();
        };
    }, [isDraggable, isMouseDown, onMouseDrag, getMovement]);

    /**
     * 左のマウスボタンが押されたまたはスクリーンがタッチされた
     */
    useEffect(() => {
        const abortController = new AbortController();
        const handler = (event: MouseEvent | TouchEvent) => {
            if (event instanceof MouseEvent && event.button !== MouseLeft) return;
            beforePositionRef.current = getCurrentPositionFromEvent(event);
            isMouseDown.current = true;
            if (onMouseDown !== undefined && isMouseDown.current) {
                onMouseDown({
                    event,
                });
            }
        };
        ref.current.addEventListener("mousedown", handler, { signal: abortController.signal });
        ref.current.addEventListener("touchstart", handler, { signal: abortController.signal });

        return () => {
            abortController.abort();
        };
    }, [onMouseDown, getCurrentPositionFromEvent, ref, isMouseDown, beforePositionRef]);

    /**
     * 左クリックおよびタッチが解除された
     */
    useEffect(() => {
        const abortController = new AbortController();
        const handler = (event: MouseEvent | TouchEvent) => {
            //event.preventDefault();
            isMouseDown.current = false;
            if (isMouseDown.current && onMouseUp !== undefined) {
                onMouseUp({ event, movement: getMovement(event) });
            }
            //isMouseDown.current = false;
        };
        window.addEventListener("mouseup", handler, { signal: abortController.signal });
        window.addEventListener("touchend", handler, { signal: abortController.signal });
        window.addEventListener("touchcancel", handler, { signal: abortController.signal });
        return () => {
            abortController.abort();
        };
    }, [isMouseDown, onMouseUp, getMovement]);

    return <[boolean, Dispatch<SetStateAction<boolean>>]>[isDraggable, setIsDraggable];
};
