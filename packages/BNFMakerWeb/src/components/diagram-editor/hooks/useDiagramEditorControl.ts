import { RefObject } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { Vector2 } from '../../../features/vector2/Vector2';
import { useHover } from '../../../hooks/useHover';
import {
    CurrentDiagramIdAtom, CurrentDiagramMousePositionAtom
} from '../../../recoil/diagram-editor/DiagramEditorState';
import { OffsetSelectorFamily } from '../../../recoil/diagram/DiagramState';

/**
 * 構文図式を編集する領域のコントローラー
 */
export const useDiagramEditorControl = (diagramDivRef: RefObject<HTMLDivElement>) => {
    const setCurrentMousePosition = useSetRecoilState(CurrentDiagramMousePositionAtom);

    /**
     * マウスが動いた時、座標を設定する
     * @param event マウスイベント
     */
    const onMouseMove = useRecoilCallback(
        ({ snapshot }) =>
            async (event: MouseEvent) => {
                const diagramDiv = diagramDivRef.current;
                const currentDiagramId = await snapshot.getPromise(CurrentDiagramIdAtom);
                if (diagramDiv === undefined || currentDiagramId === "") return;
                const offset = await snapshot.getPromise(OffsetSelectorFamily(currentDiagramId));
                setCurrentMousePosition(
                    new Vector2(
                        event.clientX - diagramDiv.offsetLeft,
                        event.clientY - diagramDiv.offsetTop
                    ).add(offset)
                );
            },
        [setCurrentMousePosition]
    );
    useHover(diagramDivRef, { onMouseMove });
};
