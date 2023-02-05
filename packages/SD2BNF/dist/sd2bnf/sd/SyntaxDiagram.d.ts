import { AST } from "../ast/AST";
import { NFA } from "../nfa/NFA";
import { SDElement } from "./SDElement";
import { SDLeaf } from "./SDLeaf";
import { SDNode } from "./SDNode";
/**
 * 1つの構文図式を表すクラス
 */
export declare class SyntaxDiagram extends Object {
    private elements;
    private connections;
    private name;
    /**
     * 構文図式のインスタンスを作成する
     * @param name 構文図式の名前。BNFでいう左辺
     */
    constructor(name: string);
    /**
     * 要素同士を接続する
     * @param from 接続元の要素
     * @param to 接続先の要素
     */
    addConnection(from: SDElement, to: SDElement): void;
    /**
     * この構文図式に終端記号を追加する
     *
     * @returns 作成した終端記号
     */
    createLeaf(name: string): SDLeaf;
    /**
     * この構文図式に非終端記号を追加する
     *
     * @returns 作成した非終端記号
     */
    createNode(bindSyntaxDiagram: SyntaxDiagram): SDNode;
    /**
     * この構文図式の要素の繋がりの辞書を返す
     *
     * @returns 繋がりの辞書
     */
    getConnections(): Map<SDElement, Set<SDElement>>;
    /**
     * この構文図式の要素を全て取得する
     *
     * @returns この構文図式の全ての要素
     */
    getElements(): Set<SDElement>;
    /**
     * この構文図式の名前を取得する
     * @returns 構文図式の名前
     */
    getName(): string;
    /**
     * この構文図式から指定した要素を削除する
     * @param aSDElement 削除する要素
     */
    removeElement(aSDElement: SDElement): void;
    /**
     * 要素同士を接続を解除する
     * @param from 接続元の要素
     * @param to 接続先の要素
     */
    removeConnection(from: SDElement, to: SDElement): void;
    /**
     * この構文図式の名前を設定する
     * @param name 設定する名前
     */
    setName(name: string): void;
    /**
     * この構文図式をBNFの抽象構文木へ変換する
     * @returns BNFの抽象構文木
     */
    toAST(): AST;
    /**
     * この構文図式をEBNFの文字列へ変換する
     * @returns EBNFの文字列
     */
    toEBNF(): string;
    /**
     * この構文図式を非決定性有限オートマトンに変換する
     *
     * @returns 非決定性有限オートマトン
     */
    toNFA(): NFA;
    /**
     * この構文図式の文字列を返す
     * @returns 構文図式の文字列
     */
    toString(): string;
}
//# sourceMappingURL=SyntaxDiagram.d.ts.map