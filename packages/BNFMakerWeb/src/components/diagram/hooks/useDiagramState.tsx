import { MutableRefObject } from 'react';
import { useRecoilCallback } from 'recoil';

import { DiagramTabData } from '../../../constants/DataTransferFormat';
import { useCommandDo } from '../../../features/command/useCommand';
import { Vector2 } from '../../../features/vector2/Vector2';
import { useClick } from '../../../hooks/useClick';
import { useDragMove } from '../../../hooks/useDragMove';
import { useDrop } from '../../../hooks/useDrop';
import { CurrentDiagramIdAtom } from '../../../recoil/diagram-editor/DiagramEditorState';
import {
    CreateDirectionModeSelectorFamily, OffsetSelectorFamily
} from '../../../recoil/diagram/DiagramState';
import { NavigationDirectionAtomFamily } from '../../../recoil/direction/NavigationDirectionState';
import { useCreateNodeCommand } from '../../diagram-element/hooks/commands/useCreateElementCommand';
import {
    useCreateDirectionCommand
} from '../../direction/hooks/commands/useCreateDirectionCommand';

/**
 * 構文図式の状態を使用する
 * @param syntaxDiagramId 構文図式のID
 * @param divRef svgエレメントを内包するdivエレメントのRef
 */
export const useDiagramState = (
    diagramId: string,
    divRef: MutableRefObject<HTMLDivElement | null>
) => {
    const commandDo = useCommandDo();
    const createDirectionCommand = useCreateDirectionCommand();
    const createNodeCommand = useCreateNodeCommand();
    /**
     * 左クリックをした時の処理
     */
    const onMouseLeftClick = useRecoilCallback(
        ({ snapshot, set }) =>
            async () => {
                const createDirectionMode = await snapshot.getPromise(
                    CreateDirectionModeSelectorFamily(diagramId)
                );
                //set(CurrentSelectElementIdAtom, "");
                if (!createDirectionMode) return;
                const navigationDirectionState = await snapshot.getPromise(
                    NavigationDirectionAtomFamily(diagramId)
                );
                const fromId = navigationDirectionState.fromElementId;
                const toId = navigationDirectionState.toElementId;
                if (fromId !== null && toId !== null) {
                    commandDo(createDirectionCommand(fromId, toId));
                }
                //矢印を作るモードを解除
                set(CreateDirectionModeSelectorFamily(diagramId), false);
                //見本の矢印の状態をリセット
                set(NavigationDirectionAtomFamily(diagramId), (current) => ({
                    ...current,
                    fromElementId: null,
                    toElementId: null,
                }));
            },
        [diagramId]
    );

    /**
     * クリックした時の処理
     */
    useClick(divRef, {
        onMouseLeftClick,
    });

    /**
     * ドラッグできる要素が入ってきた
     */
    const onDragEnter = (event: DragEvent) => {
        const dataTransfer = event.dataTransfer;
        if (dataTransfer === null) return;
        dataTransfer.dropEffect = "move";
        event.preventDefault();
    };

    /**
     * ドロップされた
     */
    const onDrop = useRecoilCallback(
        ({ snapshot }) =>
            async (event: DragEvent) => {
                const dataTransfer = event.dataTransfer;

                if (dataTransfer === null) return;
                if (!dataTransfer.types.includes(DiagramTabData)) return;
                event.preventDefault();
                const currentDiagramId = await snapshot.getPromise(CurrentDiagramIdAtom);
                if (currentDiagramId === "") return;
                const offset = await snapshot.getPromise(OffsetSelectorFamily(currentDiagramId));
                const position = new Vector2(event.offsetX, event.offsetY).add(offset);
                const bindSyntaxDiagramId = dataTransfer.getData(DiagramTabData);
                commandDo(createNodeCommand(diagramId, bindSyntaxDiagramId, position));
            },
        [commandDo, createNodeCommand]
    );

    const onDragOver = (event: DragEvent) => {
        const dataTransfer = event.dataTransfer;
        dataTransfer.dropEffect = "move";
    };

    /**
     * ドラッグできる要素が出た
     */
    const onDragLeave = (event: DragEvent) => {
        const dataTransfer = event.dataTransfer;
        if (dataTransfer === null) return;
    };
    useDrop(divRef, { onDrop, onDragEnter, onDragLeave, onDragOver });

    /**
     * ドラッグした時、構文図式を動かす
     */
    const onMouseDrag = useRecoilCallback(
        ({ set }) =>
            ({ movement }: { event: MouseEvent | TouchEvent; movement: Vector2 }) => {
                //event.preventDefault();
                set(OffsetSelectorFamily(diagramId), (current) =>
                    current.sub(new Vector2(movement.x, movement.y))
                );
            },
        [diagramId]
    );
    useDragMove(divRef, { onMouseDrag });
};
