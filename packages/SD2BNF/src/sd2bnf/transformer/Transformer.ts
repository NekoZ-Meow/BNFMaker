import { AST } from "../ast/AST";
import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { Leaf } from "../ast/symbols/leaf-symbol/Leaf";
import { Node } from "../ast/symbols/leaf-symbol/Node";
import { Closure } from "../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../ast/symbols/two-children-symbol/Concatenation";

/**
 * 抽象構文木の変換器を表す抽象クラス
 */
export abstract class Transformer<Result, Converting> extends Object {
    protected anAST: AST;

    /**
     * 抽象構文木の変換器を生成する
     * @param anAST 抽象構文木
     */
    constructor(anAST: AST) {
        super();
        this.anAST = anAST;
    }

    /**
     * 選択のシンボルを変換する
     * @param anAlternation 選択のシンボル
     */
    protected abstract transformAlternation(anAlternation: Alternation): Converting;

    /**
     * 閉包のシンボルを変換する
     * @param anAlternation 閉包のシンボル
     */
    protected abstract transformClosure(aClosure: Closure): Converting;

    /**
     * 結合のシンボルを変換する
     * @param anAlternation 結合のシンボル
     */
    protected abstract transformConcatenation(aConcatenation: Concatenation): Converting;

    /**
     * 終端のシンボルを変換する
     * @param anAlternation 終端のシンボル
     */
    protected abstract transformLeaf(aLeaf: Leaf): Converting;

    /**
     * 非終端のシンボルを変換する
     * @param anAlternation 非終端のシンボル
     */
    protected abstract transformNode(aNode: Node): Converting;

    /**
     * シンボルを変換するメソッドを選択し、実行する。
     * @param aSymbol シンボル
     * @returns 変換後の値
     */
    protected transformSymbol(aSymbol: ASTSymbol): Converting {
        if (aSymbol instanceof Alternation) {
            return this.transformAlternation(aSymbol);
        } else if (aSymbol instanceof Concatenation) {
            return this.transformConcatenation(aSymbol);
        } else if (aSymbol instanceof Closure) {
            return this.transformClosure(aSymbol);
        } else if (aSymbol instanceof Leaf) {
            return this.transformLeaf(aSymbol);
        } else if (aSymbol instanceof Node) {
            return this.transformNode(aSymbol);
        }

        throw Error(`'${aSymbol.constructor.name}'は変換に対応していません`);
    }

    /**
     * 抽象構文木を変換する
     */
    abstract transform(): Result;
}
