import { AST } from "../../ast/AST";
import { ASTSymbol } from "../../ast/symbols/ASTSymbol";
import { Leaf } from "../../ast/symbols/leaf-symbol/Leaf";
import { Node } from "../../ast/symbols/leaf-symbol/Node";
import { Closure } from "../../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../ast/symbols/two-children-symbol/Concatenation";
import { Transformer } from "../Transformer";
/**
 * 抽象構文木をEBNFに変換するための変換器
 */
export declare class EBNFTransformer extends Transformer<string, string> {
    private static memoMap;
    private static readonly BIND;
    private static readonly OR_SEPARATOR;
    private static readonly ZERO_OR_MORE;
    private static readonly ONE_OR_MORE;
    private static readonly L_PER;
    private static readonly R_PER;
    private static readonly SPACE;
    private static readonly QUOTATION;
    private static readonly DOUBLE_QUOTATION;
    private static readonly OPTIONAL;
    private static readonly END_OF_STATEMENT;
    /**
     * 抽象構文木をEBNFに変換するための変換器を生成する
     */
    constructor(anAST: AST);
    /**
     * 選択のシンボルをEBNFに変換する
     * @param anAlternation 選択のシンボル
     * @return EBNFの文字列
     */
    protected transformAlternation(anAlternation: Alternation): string;
    /**
     * 結合のシンボルをEBNFに変換する
     * @param aConcatenation 結合のシンボル
     * @return EBNFの文字列
     */
    protected transformConcatenation(aConcatenation: Concatenation): string;
    /**
     * 閉包のシンボルをEBNFに変換する
     * @param aClosure 閉包のシンボル
     * @return EBNFの文字列
     */
    protected transformClosure(aClosure: Closure): string;
    /**
     * 終了状態のシンボルをEBNFに変換する
     * @param aLeaf 終了状態のシンボル
     * @return EBNFの文字列
     */
    protected transformLeaf(aLeaf: Leaf): string;
    /**
     * 変数のシンボルをEBNFに変換する
     * @param aNode 変数のシンボル
     * @return EBNFの文字列
     */
    protected transformNode(aNode: Node): string;
    /**
     * シンボルをEBNFに変換する
     * @param aSymbol EBNFに変換するシンボル
     * @returns 変換したEBNF
     */
    protected transformSymbol(aSymbol: ASTSymbol): string;
    /**
     * ASTをEBNFに変換する
     * @return 変換後のEBNF
     */
    transform(): string;
}
//# sourceMappingURL=EBNFTransformer.d.ts.map