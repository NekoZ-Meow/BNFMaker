import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { Leaf } from "../ast/symbols/leaf-symbol/Leaf";
import { SDElement } from "./SDElement";
import { SyntaxDiagram } from "./SyntaxDiagram";

/**
 * 構文図式の終端記号を表すクラス
 */
export class SDLeaf extends SDElement {
    private aName: string;
    /**
     * 終端記号のインスタンスを生成する
     *
     * @param aSyntaxDiagram この要素が属している構文図式
     * @param aName 終端記号の名前
     */
    constructor(aSyntaxDiagram: SyntaxDiagram, aName: string) {
        super(aSyntaxDiagram);
        this.aName = aName;
    }

    /**
     * この終端記号の名前を返す
     * @returns この終端記号の名前
     */
    public getName(): string {
        return this.aName;
    }

    /**
     * この終端記号の名前を設定する
     * @param aName 設定する名前
     */
    public setName(aName: string) {
        this.aName = aName;
        return;
    }

    /**
     * この終端記号を抽象構文木の終端記号へ変換する
     */
    public toASTSymbol(): ASTSymbol {
        return new Leaf(this.aName);
    }
}
