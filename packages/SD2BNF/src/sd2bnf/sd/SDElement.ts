import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { SyntaxDiagram } from "./SyntaxDiagram";

/**
 * 構文図式で使用する要素の抽象クラス
 */
export abstract class SDElement extends Object {
    public isEnd = false; //この要素が終了地点か
    public isStart = false; //この要素が開始地点か
    protected syntaxDiagram: SyntaxDiagram; //この要素が属している構文図式

    public constructor(syntaxDiagram: SyntaxDiagram) {
        super();
        this.syntaxDiagram = syntaxDiagram;
    }

    /**
     * この要素から指定した要素に接続する
     * @param aSDElement  接続する要素
     */
    public connectTo(aSDElement: SDElement) {
        this.syntaxDiagram.addConnection(this, aSDElement);
    }

    /**
     * この要素から指定した要素への接続を解除する
     * @param aSDElement 接続を解除する要素
     */
    public disconnectFrom(aSDElement: SDElement) {
        this.syntaxDiagram.removeConnection(this, aSDElement);
    }

    /**
     * この要素の名前を取得する
     *
     * @returns この要素の名前
     */
    public abstract getName(): string;

    /**
     * この要素が接続している要素を取得する
     * @returns この要素が接続している要素
     */
    public getNext(): Set<SDElement> {
        return new Set<SDElement>(this.syntaxDiagram.getConnections().get(this));
    }

    /**
     * この要素が属している構文図式を返す
     * @returns この要素が属している構文図式
     */
    public getBelongingSyntaxDiagram() {
        return this.syntaxDiagram;
    }

    /**
     * この要素を削除する
     */
    public remove(): void {
        this.syntaxDiagram.removeElement(this);
        return;
    }

    /**
     * この要素の名前を設定する
     * @param aName 設定する名前
     */
    public abstract setName(aName: string): void;

    /**
     * この要素を抽象構文木のシンボルへ変換する
     */
    public abstract toASTSymbol(): ASTSymbol;

    /**
     * この要素を文字列に変換する
     * @returns この要素の文字列
     */
    public toString(): string {
        const className = this.constructor.name;
        const exitsString = Array.from(this.getNext())
            .map((exitElement) => `${exitElement.constructor.name}('${exitElement.getName()}')`)
            .join(", ");
        return `${className}('${this.getName()}') => [ ${exitsString} ]`;
    }
}
