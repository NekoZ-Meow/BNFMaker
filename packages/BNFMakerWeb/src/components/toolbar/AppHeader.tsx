import React from "react";
import { useRecoilValue } from "recoil";

import { AppBar, Toolbar, Typography } from "@mui/material";

import { ControlToolbarThemeAtom } from "../../recoil/theme/ToolbarTheme";
import { ColumnFlexBox } from "../../styles/flex-box/ColumnFlexBox";
import { AppHeaderFileButton } from "../buttons/app-header/AppHeaderFileButton";

/**
 * ヘッダーを表すコンポーネント
 */
export const AppHeader = React.memo(() => {
    const toolbarStyle = useRecoilValue(ControlToolbarThemeAtom);
    return (
        <AppBar position="relative" elevation={0}>
            <Toolbar
                style={{
                    backgroundColor: toolbarStyle.backGroundColor,
                    borderWidth: "0px",
                }}
            >
                <ColumnFlexBox>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="./"
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: toolbarStyle.buttonColor,
                            textDecoration: "none",
                        }}
                    >
                        BNFMaker
                    </Typography>
                    <Toolbar
                        style={{
                            height: "fit-content",
                            minHeight: "20px",
                            padding: 0,
                        }}
                    >
                        <AppHeaderFileButton></AppHeaderFileButton>
                    </Toolbar>
                </ColumnFlexBox>
            </Toolbar>
        </AppBar>
    );
});
