import { useEffect, useState } from "react";

import { Vector2 } from "../features/vector2/Vector2";

/**
 * ウィンドウの大きさを使用する
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<Vector2>(new Vector2(0, 0));

    /**
     * 初期化処理
     */
    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize(new Vector2(window.innerWidth, window.innerHeight));
        };
        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    return windowSize;
};
