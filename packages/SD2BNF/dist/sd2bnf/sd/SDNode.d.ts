import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { SDElement } from "./SDElement";
import { SyntaxDiagram } from "./SyntaxDiagram";
/**
 * 構文図式の非終端記号を表すクラス
 */
export declare class SDNode extends SDElement {
    private bindSyntaxDiagram;
    /**
     * 非終端記号のインスタンスを生成する
     * @param aSyntaxDiagram この要素が属している構文図式
     * @param bindSyntaxDiagram この非終端記号が示す構文図式
     */
    constructor(aSyntaxDiagram: SyntaxDiagram, bindSyntaxDiagram: SyntaxDiagram);
    /**
     * この非終端記号の名前を返す
     * @returns この非終端記号の名前
     */
    getName(): string;
    /**
     * この非終端記号が示す構文図式を返す
     * @returns この非終端記号が示す構文図式
     */
    getBindSyntaxDiagram(): SyntaxDiagram;
    /**
     * この非終端記号の名前を設定する。
     * つまりこの要素が示す構文図式の名前を設定する。
     *
     * @param aName 設定する名前
     */
    setName(aName: string): void;
    /**
     * この非終端記号を抽象構文木の非終端記号へ変換する
     */
    toASTSymbol(): ASTSymbol;
}
//# sourceMappingURL=SDNode.d.ts.map