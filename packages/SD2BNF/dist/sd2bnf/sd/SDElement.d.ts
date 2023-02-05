import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { SyntaxDiagram } from "./SyntaxDiagram";
/**
 * 構文図式で使用する要素の抽象クラス
 */
export declare abstract class SDElement extends Object {
    isEnd: boolean;
    isStart: boolean;
    protected syntaxDiagram: SyntaxDiagram;
    constructor(syntaxDiagram: SyntaxDiagram);
    /**
     * この要素から指定した要素に接続する
     * @param aSDElement  接続する要素
     */
    connectTo(aSDElement: SDElement): void;
    /**
     * この要素から指定した要素への接続を解除する
     * @param aSDElement 接続を解除する要素
     */
    disconnectFrom(aSDElement: SDElement): void;
    /**
     * この要素の名前を取得する
     *
     * @returns この要素の名前
     */
    abstract getName(): string;
    /**
     * この要素が接続している要素を取得する
     * @returns この要素が接続している要素
     */
    getNext(): Set<SDElement>;
    /**
     * この要素が属している構文図式を返す
     * @returns この要素が属している構文図式
     */
    getBelongingSyntaxDiagram(): SyntaxDiagram;
    /**
     * この要素を削除する
     */
    remove(): void;
    /**
     * この要素の名前を設定する
     * @param aName 設定する名前
     */
    abstract setName(aName: string): void;
    /**
     * この要素を抽象構文木のシンボルへ変換する
     */
    abstract toASTSymbol(): ASTSymbol;
    /**
     * この要素を文字列に変換する
     * @returns この要素の文字列
     */
    toString(): string;
}
//# sourceMappingURL=SDElement.d.ts.map