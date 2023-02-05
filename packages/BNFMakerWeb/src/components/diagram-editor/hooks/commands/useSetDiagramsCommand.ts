import { useRecoilCallback, useSetRecoilState } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import { DiagramAndJsonSelector } from "../../../../recoil/diagram-editor/DiagramEditorState";
import { GetAllElementStateSelector } from "../../../../recoil/diagram-element/DiagramElementState";
import { GetAllDiagramStateSelector } from "../../../../recoil/diagram/DiagramState";
import { GetAllDirectionStateSelector } from "../../../../recoil/direction/DirectionState";
import { DiagramsJsonType } from "../../../../types/diagram-editor/DiagramJsonType";

/**
 * JSONから構文図式群を作成するためのコマンド
 */
export const useSetDiagramsFromJsonCommand = () => {
    const setDiagramsFromJson = useSetRecoilState(DiagramAndJsonSelector);
    return useRecoilCallback(
        ({ snapshot }) =>
            async (diagramJson: string) => {
                const [oldDiagrams, oldElements, oldDirections] = await Promise.all([
                    snapshot.getPromise(GetAllDiagramStateSelector),
                    snapshot.getPromise(GetAllElementStateSelector),
                    snapshot.getPromise(GetAllDirectionStateSelector),
                ]);
                return <CommandType<string>>{
                    execute: () => {
                        setDiagramsFromJson(diagramJson);
                    },
                    undo: () => {
                        setDiagramsFromJson(
                            JSON.stringify(<DiagramsJsonType>{
                                diagrams: oldDiagrams,
                                elements: oldElements,
                                directions: oldDirections,
                            })
                        );
                    },
                };
            },
        []
    );
};
