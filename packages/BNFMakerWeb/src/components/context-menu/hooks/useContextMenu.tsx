import React, { ReactElement, useMemo, useState } from "react";

import { Popover } from "@mui/material";

import { Vector2 } from "../../../features/vector2/Vector2";

/**
 * メニューを使用する
 */
export const useContextMenu = (
    menuListFactory: ({
        open,
        close,
    }: {
        open: (pageX: number, pageY: number) => void;
        close: () => void;
    }) => ReactElement,
    uniqueId: string
) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<Vector2>(new Vector2(0, 0));

    const open = (pageX: number, pageY: number) => {
        setPosition(new Vector2(pageX, pageY));
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    const popover = useMemo(
        () => (
            <Popover
                anchorReference="anchorPosition"
                anchorPosition={{ top: position.y, left: position.x }}
                open={isOpen}
                onClose={close}
                key={`Menu:${uniqueId}`}
            >
                {menuListFactory({ open, close })}
            </Popover>
        ),
        [uniqueId, isOpen, position, menuListFactory]
    );

    return {
        open,
        close,
        popover,
    };
};
