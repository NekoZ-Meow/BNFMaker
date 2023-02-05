import { Vector2 } from "../../features/vector2/Vector2";

/**
 * 構文図式の状態を表す
 */
export type DiagramType = {
    id: string;
    createDirectionMode: boolean;
    offset: Vector2;
    name: string;
};
