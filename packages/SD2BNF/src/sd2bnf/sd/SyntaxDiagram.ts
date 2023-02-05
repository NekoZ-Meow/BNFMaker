import { EOL } from "os";

import { AST } from "../ast/AST";
import { NFA } from "../nfa/NFA";
import { State } from "../nfa/State";
import { SDElement } from "./SDElement";
import { SDLeaf } from "./SDLeaf";
import { SDNode } from "./SDNode";

/**
 * 1つの構文図式を表すクラス
 */
export class SyntaxDiagram extends Object {
    private elements = new Set<SDElement>();
    private connections = new Map<SDElement, Set<SDElement>>();
    private name: string;

    /**
     * 構文図式のインスタンスを作成する
     * @param name 構文図式の名前。BNFでいう左辺
     */
    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * 要素同士を接続する
     * @param from 接続元の要素
     * @param to 接続先の要素
     */
    public addConnection(from: SDElement, to: SDElement) {
        if (!(this.elements.has(from) && this.elements.has(to))) {
            throw Error("The nodes to be connected must belong to the same SyntaxDiagram.");
        }
        const aSet = this.connections.get(from) ?? new Set();
        this.connections.set(from, aSet);
        aSet.add(to);
        return;
    }

    /**
     * この構文図式に終端記号を追加する
     *
     * @returns 作成した終端記号
     */
    public createLeaf(name: string) {
        const aLeaf = new SDLeaf(this, name);
        this.elements.add(aLeaf);
        return aLeaf;
    }

    /**
     * この構文図式に非終端記号を追加する
     *
     * @returns 作成した非終端記号
     */
    public createNode(bindSyntaxDiagram: SyntaxDiagram) {
        const aNode = new SDNode(this, bindSyntaxDiagram);
        this.elements.add(aNode);
        return aNode;
    }

    /**
     * この構文図式の要素の繋がりの辞書を返す
     *
     * @returns 繋がりの辞書
     */
    public getConnections(): Map<SDElement, Set<SDElement>> {
        return new Map(this.connections);
    }

    /**
     * この構文図式の要素を全て取得する
     *
     * @returns この構文図式の全ての要素
     */
    public getElements(): Set<SDElement> {
        return new Set(this.elements);
    }

    /**
     * この構文図式の名前を取得する
     * @returns 構文図式の名前
     */
    public getName(): string {
        return this.name;
    }

    /**
     * この構文図式から指定した要素を削除する
     * @param aSDElement 削除する要素
     */
    public removeElement(aSDElement: SDElement) {
        this.elements.delete(aSDElement);
        this.connections.delete(aSDElement);
        this.connections.forEach((aSet) => {
            aSet.delete(aSDElement);
        });
        return;
    }

    /**
     * 要素同士を接続を解除する
     * @param from 接続元の要素
     * @param to 接続先の要素
     */
    public removeConnection(from: SDElement, to: SDElement) {
        const aSet = this.connections.get(from);
        if (aSet === undefined) return;
        aSet.delete(to);
    }

    /**
     * この構文図式の名前を設定する
     * @param name 設定する名前
     */
    public setName(name: string) {
        this.name = name;
        return;
    }

    /**
     * この構文図式をBNFの抽象構文木へ変換する
     * @returns BNFの抽象構文木
     */
    public toAST(): AST {
        return this.toNFA().toAST();
    }

    /**
     * この構文図式をEBNFの文字列へ変換する
     * @returns EBNFの文字列
     */
    public toEBNF(): string {
        return this.toAST().toEBNF();
    }

    /**
     * この構文図式を非決定性有限オートマトンに変換する
     *
     * @returns 非決定性有限オートマトン
     */
    public toNFA(): NFA {
        const aNFA = new NFA(this.getName());
        const elementToStateMap = new Map<SDElement, State>();
        this.elements.forEach((element) => {
            const aState = new State(`State: ${element.getName()}`);
            if (element.isStart) aNFA.addStart(aState);
            if (element.isEnd) aNFA.addEnd(aState);
            elementToStateMap.set(element, aState);
        });

        this.connections.forEach((aSet, aSDElement) => {
            const aState = elementToStateMap.get(aSDElement);
            if (aState === undefined) return;
            aSet.forEach((anotherSDElement) => {
                const anotherState = elementToStateMap.get(anotherSDElement);
                if (anotherState === undefined) return;
                aState.transitionTo(anotherState, aSDElement.toASTSymbol());
            });
        });
        return aNFA;
    }

    /**
     * この構文図式の文字列を返す
     * @returns 構文図式の文字列
     */
    public toString(): string {
        return Array.from(this.elements.values())
            .map((aElement) => aElement.toString())
            .join(EOL);
    }
}
