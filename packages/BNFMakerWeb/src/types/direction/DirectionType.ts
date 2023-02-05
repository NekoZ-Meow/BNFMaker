/**
 * 矢印の状態を表す
 */
export type DirectionType = {
    id: string;
    fromId: string;
    toId: string;
};

/**
 * 矢印の見本の状態を表す
 */
export type NavigationDirectionType = {
    diagramId: string;
    fromElementId: string | null;
    toElementId: string | null;
};
