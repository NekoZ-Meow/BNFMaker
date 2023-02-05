import { RefObject, useEffect, useState } from "react";

import { Vector2 } from "../features/vector2/Vector2";

/**
 * 要素の大きさを使用する
 * @param ref 要素
 */
export const useElementSize = (ref: RefObject<HTMLElement>) => {
    const [size, setSize] = useState<Vector2>(new Vector2(0, 0));

    /**
     * 大きさの変更を監視する
     */
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length == 0) return;
            const contentRect = entries[0].contentRect;
            setSize(new Vector2(contentRect.width, contentRect.height));
        });
        ref.current && resizeObserver.observe(ref.current);

        return (): void => resizeObserver.disconnect();
    }, [ref]);

    return size;
};
