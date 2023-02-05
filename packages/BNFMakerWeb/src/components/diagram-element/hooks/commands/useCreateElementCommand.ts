import { useCallback } from "react";

import { CommandType } from "../../../../features/command/types/CommandType";
import { ID } from "../../../../features/id/ID";
import { Vector2 } from "../../../../features/vector2/Vector2";
import {
    useDeleteDiagramElement,
    useDuplicateDiagramElement,
} from "../../../../recoil/diagram-element/DiagramElementState";
import { useCreateLeaf } from "../../../../recoil/diagram-element/LeafState";
import { useCreateNode } from "../../../../recoil/diagram-element/NodeState";

/**
 * 終端記号を作成するためのコマンド
 */
export const useCreateLeafCommand = () => {
    const createLeaf = useCreateLeaf();
    const deleteElement = useDeleteDiagramElement();
    return useCallback(
        (diagramId: string, name: string, position: Vector2 = new Vector2(0, 0)) => {
            const id = ID.getID();
            return <CommandType<void>>{
                execute: () => {
                    createLeaf(id, diagramId, name, position);
                },
                undo: () => {
                    deleteElement(id);
                },
            };
        },
        [createLeaf, deleteElement]
    );
};

/**
 * 非終端記号を作成するためのコマンド
 */
export const useCreateNodeCommand = () => {
    const createNode = useCreateNode();
    const deleteElement = useDeleteDiagramElement();
    return useCallback(
        (diagramId: string, bindDiagramId: string, position: Vector2 = new Vector2(0, 0)) => {
            const id = ID.getID();
            return <CommandType<void>>{
                execute: () => {
                    createNode(id, diagramId, bindDiagramId, position);
                },
                undo: () => {
                    deleteElement(id);
                },
            };
        },
        [createNode, deleteElement]
    );
};

/**
 * 構文図式の要素を複製するためのコマンド
 */
export const useDuplicateElementCommand = () => {
    const duplicate = useDuplicateDiagramElement();
    const deleteElement = useDeleteDiagramElement();
    return useCallback(
        (elementId: string, position?: Vector2) => {
            const newElementId = ID.getID();
            return <CommandType<void>>{
                execute: () => {
                    duplicate(elementId, newElementId, position);
                },
                undo: () => {
                    deleteElement(newElementId);
                },
            };
        },
        [deleteElement, duplicate]
    );
};
