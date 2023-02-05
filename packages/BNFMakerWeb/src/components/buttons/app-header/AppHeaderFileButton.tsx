import React, { useCallback } from "react";
import { useRecoilCallback } from "recoil";

import { MenuItem } from "@mui/material";

import { useCommandDo } from "../../../features/command/useCommand";
import { FileIO } from "../../../features/io/FileIO";
import { DiagramAndJsonSelector } from "../../../recoil/diagram-editor/DiagramEditorState";
import { useSetDiagramsFromJsonCommand } from "../../diagram-editor/hooks/commands/useSetDiagramsCommand";
import { AppHeaderButton } from "./AppHeaderButton";

/**
 * ファイル操作に関するメニューを表示するボタン
 */
export const AppHeaderFileButton = React.memo(() => {
    const setDiagramsFromJsonCommand = useSetDiagramsFromJsonCommand();
    const commandDo = useCommandDo();
    /**
     * セーブボタンを押した時、構文図式のデータを保存する
     */
    const onSaveHandler = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
                const aJson = await snapshot.getPromise(DiagramAndJsonSelector);
                const aBlob = new Blob([aJson], { type: "text/json" });
                await FileIO.downloadFile(aBlob, "diagram.json");
            },
        []
    );

    /**
     * ファイル読み込み、構文図式を作成する
     */
    const onLoadHandler = useRecoilCallback(
        () => async (formEvent: React.FormEvent<HTMLInputElement>) => {
            formEvent.preventDefault();
            const anArray = Array.from(formEvent.currentTarget.files);
            if (anArray.length === 0) return;
            commandDo(await setDiagramsFromJsonCommand(await FileIO.loadFileAsText(anArray[0])));
        },
        []
    );

    const menuItemsFactory = useCallback(
        ({ handleClose }: { handleClose: () => void }) => {
            return [
                <MenuItem
                    key={"file-save-button"}
                    onClick={() => {
                        onSaveHandler();
                        handleClose();
                    }}
                >
                    save
                </MenuItem>,
                <label key={"file-load-label"} htmlFor="file-load-button">
                    <MenuItem key={"file-load-button"}>
                        load
                        <input
                            key={"file-load-input"}
                            id="file-load-button"
                            hidden
                            type="file"
                            accept="text/json"
                            onInput={(event) => {
                                onLoadHandler(event);
                                handleClose();
                            }}
                        ></input>
                    </MenuItem>
                </label>,
            ];
        },
        [onLoadHandler, onSaveHandler]
    );

    return (
        <AppHeaderButton
            key={"app-header-file-button"}
            title="File"
            menuItemsFactory={menuItemsFactory}
        ></AppHeaderButton>
    );
});
