import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { SDElement } from "./SDElement";
import { SyntaxDiagram } from "./SyntaxDiagram";
/**
 * 構文図式の終端記号を表すクラス
 */
export declare class SDLeaf extends SDElement {
    private aName;
    /**
     * 終端記号のインスタンスを生成する
     *
     * @param aSyntaxDiagram この要素が属している構文図式
     * @param aName 終端記号の名前
     */
    constructor(aSyntaxDiagram: SyntaxDiagram, aName: string);
    /**
     * この終端記号の名前を返す
     * @returns この終端記号の名前
     */
    getName(): string;
    /**
     * この終端記号の名前を設定する
     * @param aName 設定する名前
     */
    setName(aName: string): void;
    /**
     * この終端記号を抽象構文木の終端記号へ変換する
     */
    toASTSymbol(): ASTSymbol;
}
//# sourceMappingURL=SDLeaf.d.ts.map