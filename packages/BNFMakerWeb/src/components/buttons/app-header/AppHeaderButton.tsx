import { Menu } from "@mui/material";
import Button from "@mui/material/Button";
import React, { ReactNode } from "react";
import { FontColor } from "../../../constants/FontColor";
import { FontFamily } from "../../../constants/FontFamily";

/**
 * タイトルの下につく操作パネルのボタン
 */
export const AppHeaderButton: React.FC<{
    title: string;
    menuItemsFactory: ({ handleClose }: { handleClose: () => void }) => ReactNode[];
}> = React.memo(({ title, menuItemsFactory }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="app-header-button"
                key={"app-header-button"}
                aria-controls={open ? "app-header-file-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                    padding: 0,
                    minWidth: 0,
                    fontFamily: FontFamily.primary,
                    color: FontColor.primary,
                    fontWeight: "normal",
                }}
            >
                {title}
            </Button>
            <Menu
                id="app-header-menu"
                key={"app-header-menu"}
                aria-labelledby="app-header-file-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {menuItemsFactory({ handleClose })}
            </Menu>
        </div>
    );
});
