import { AST } from "../../ast/AST";
import { ASTSymbol } from "../../ast/symbols/ASTSymbol";
import { Leaf } from "../../ast/symbols/leaf-symbol/Leaf";
import { Node } from "../../ast/symbols/leaf-symbol/Node";
import { Closure } from "../../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../ast/symbols/two-children-symbol/Concatenation";
import { Transformer } from "../Transformer";
/**
 * AST簡略化のための変換器
 */
export declare class SimplifyTransformer extends Transformer<AST, ASTSymbol> {
    private static memoMap;
    /**
     * 結合のシンボルを簡略化する
     * @param aConcatenation 結合のシンボル
     * @returns 簡略化後の結合シンボル
     */
    protected transformConcatenation(aConcatenation: Concatenation): ASTSymbol;
    /**
     * 選択のシンボルを簡略化する
     * @param anAlternation 選択のシンボル
     * @returns 簡略化後の選択シンボル
     */
    protected transformAlternation(anAlternation: Alternation): ASTSymbol;
    /**
     * 閉包のシンボルを簡略化する
     * @param aClosure 簡略化する閉包のシンボル
     * @return 簡略化後の閉包シンボル
     */
    protected transformClosure(aClosure: Closure): ASTSymbol;
    /**
     * 終端記号を簡略化する(そのまま返す)
     * @param aLeaf 終端記号を簡略化する
     * @returns 簡略化後の終端記号
     */
    protected transformLeaf(aLeaf: Leaf): Leaf;
    /**
     * 変数のシンボルを簡略化する(そのまま返す)
     * @param aNode 変数のシンボル
     * @returns 簡略化した変数のシンボル
     */
    protected transformNode(aNode: Node): ASTSymbol;
    /**
     * シンボル単体を簡略化する
     * @param aSymbol 簡略化するシンボル
     * @returns 簡略化後のシンボル
     */
    protected transformSymbol(aSymbol: ASTSymbol): ASTSymbol;
    /**
     * AST簡略化のための変換器を生成する
     * @param anAST 簡略化するAST
     */
    constructor(anAST: AST);
    /**
     * ASTを簡略化する
     * @returns 簡略化後のAST
     */
    transform(): AST;
}
//# sourceMappingURL=SimplifyTransformer.d.ts.map