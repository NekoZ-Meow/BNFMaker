import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { ID } from "../../../../features/id/ID";
import { Vector2 } from "../../../../features/vector2/Vector2";
import { CurrentDiagramIdAtom } from "../../../../recoil/diagram-editor/DiagramEditorState";
import { useCreateEnd, useCreateStart } from "../../../../recoil/diagram-element/LeafState";
import { useCreateDiagram, useDeleteDiagram } from "../../../../recoil/diagram/DiagramState";

/**
 * 構文図式を作成するためのコマンド
 */
export const useCreateDiagramCommand = () => {
    const createDiagram = useCreateDiagram();
    const deleteDiagram = useDeleteDiagram();
    const createStart = useCreateStart();
    const createEnd = useCreateEnd();
    return useRecoilCallback(
        ({ set }) =>
            (name: string) => {
                const id = ID.getID();
                return <CommandType<string>>{
                    execute: () => {
                        createDiagram(id, name);
                        createStart(ID.getID(), id);
                        createEnd(ID.getID(), id, new Vector2(300, 300));
                        set(CurrentDiagramIdAtom, id);
                        return id;
                    },
                    undo: () => {
                        deleteDiagram(id);
                    },
                };
            },
        [createDiagram, createEnd, createStart, deleteDiagram]
    );
};
