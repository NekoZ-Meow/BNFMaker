import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { CurrentDiagramIdAtom } from "../../../../recoil/diagram-editor/DiagramEditorState";

/**
 * 構文図式を選択するためのコマンド
 */
export const useSelectDiagramCommand = () => {
    return useRecoilCallback(
        ({ snapshot, set }) =>
            async (diagramId: string) => {
                const currentId = await snapshot.getPromise(CurrentDiagramIdAtom);
                return <CommandType<void>>{
                    execute: () => {
                        set(CurrentDiagramIdAtom, diagramId);
                    },
                    undo: () => {
                        set(CurrentDiagramIdAtom, currentId);
                    },
                };
            },
        []
    );
};
