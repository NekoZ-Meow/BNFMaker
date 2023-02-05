import { useRecoilCallback } from "recoil";

import { CommandType } from "../../../../features/command/types/CommandType";
import {
    DiagramNameSelectorFamily,
    useSetDiagramName,
} from "../../../../recoil/diagram/DiagramState";

/**
 * 構文図式を作成するためのコマンド
 */
export const useSetDiagramNameCommand = () => {
    const setDiagramName = useSetDiagramName();
    return useRecoilCallback(
        ({ snapshot }) =>
            async (diagramId: string, name: string) => {
                const currentName = await snapshot.getPromise(DiagramNameSelectorFamily(diagramId));
                return <CommandType<void>>{
                    execute: () => {
                        setDiagramName(diagramId, name);
                    },
                    undo: () => {
                        setDiagramName(diagramId, currentName);
                    },
                };
            },
        [setDiagramName]
    );
};
