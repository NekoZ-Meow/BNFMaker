import { selectorFamily } from "recoil";
import { AST, SDElement, SyntaxDiagram } from "sd2bnf";

import { DiagramElementKind } from "../../types/diagram-element/DiagramElementKind";
import {
    DiagramElementNameSelectorFamily,
    ElementKindSelectorFamily,
    GetElementIdsFromDiagramId,
} from "../diagram-element/DiagramElementState";
import { BindDiagramIdSelectorFamily } from "../diagram-element/NodeState";
import { DiagramNameSelectorFamily } from "../diagram/DiagramState";
import { DirectionSelectorFamily, GetDirectionIdsFromDiagramId } from "../direction/DirectionState";

/**
 * 構文図式をASTに変換して返す
 */
export const GetASTSelectorFamily = selectorFamily<AST | null, string>({
    key: "GetASTSelectorFamily",
    get:
        (diagramId: string) =>
        ({ get }) => {
            try {
                // 構文図式オブジェクトの作成
                const syntaxDiagram = new SyntaxDiagram(get(DiagramNameSelectorFamily(diagramId)));
                const elementIdToSDElement = new Map<string, SDElement>();
                // 構文図式の要素を作成
                get(GetElementIdsFromDiagramId(diagramId)).forEach((elementId) => {
                    const kind = get(ElementKindSelectorFamily(elementId));
                    let aSDElement: SDElement;
                    if (kind === DiagramElementKind.Node) {
                        const bindDiagramName = get(
                            DiagramNameSelectorFamily(get(BindDiagramIdSelectorFamily(elementId)))
                        );
                        console.log(bindDiagramName);
                        aSDElement = syntaxDiagram.createNode(new SyntaxDiagram(bindDiagramName));
                    } else {
                        aSDElement = syntaxDiagram.createLeaf(
                            get(DiagramElementNameSelectorFamily(elementId))
                        );
                    }

                    if (kind === DiagramElementKind.Start) {
                        aSDElement.isStart = true;
                    }
                    if (kind === DiagramElementKind.End) {
                        aSDElement.isEnd = true;
                    }
                    elementIdToSDElement.set(elementId, aSDElement);
                });
                //繋がりを作成
                get(GetDirectionIdsFromDiagramId(diagramId)).forEach((directionId: string) => {
                    const { fromId, toId } = get(DirectionSelectorFamily(directionId));
                    const fromElement = elementIdToSDElement.get(fromId);
                    const toElement = elementIdToSDElement.get(toId);
                    fromElement.connectTo(toElement);
                });
                //console.log(syntaxDiagram.toString());
                const anAST = syntaxDiagram.toAST();
                console.log(anAST.toString());
                return anAST;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
});
