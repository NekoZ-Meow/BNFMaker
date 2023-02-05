import { HashMap } from "hashed-collections";

import { AST } from "../../ast/AST";
import { ASTSymbol } from "../../ast/symbols/ASTSymbol";
import { Leaf } from "../../ast/symbols/leaf-symbol/Leaf";
import { Node } from "../../ast/symbols/leaf-symbol/Node";
import { Closure } from "../../ast/symbols/one-child-symbol/closure/Closure";
import { ZeroOrOne } from "../../ast/symbols/one-child-symbol/closure/ZeroOrOne";
import { Alternation } from "../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../ast/symbols/two-children-symbol/Concatenation";
import { Transformer } from "../Transformer";

/**
 * 抽象構文木をEBNFに変換するための変換器
 */
export class EBNFTransformer extends Transformer<string, string> {
    // 同じシンボルが既に簡略化されていたらここから取り出す
    private static memoMap = new HashMap<ASTSymbol, string>();

    private static readonly BIND = " ::= ";
    private static readonly OR_SEPARATOR = "|";
    private static readonly ZERO_OR_MORE = "*";
    private static readonly ONE_OR_MORE = "+";
    private static readonly L_PER = "(";
    private static readonly R_PER = ")";
    private static readonly SPACE = " ";
    private static readonly QUOTATION = "'";
    private static readonly DOUBLE_QUOTATION = '"';
    private static readonly OPTIONAL = "?";
    private static readonly END_OF_STATEMENT = "";

    /**
     * 抽象構文木をEBNFに変換するための変換器を生成する
     */
    constructor(anAST: AST) {
        super(anAST);
    }

    /**
     * 選択のシンボルをEBNFに変換する
     * @param anAlternation 選択のシンボル
     * @return EBNFの文字列
     */
    protected transformAlternation(anAlternation: Alternation): string {
        const operands = anAlternation.expand();
        let aString = operands
            .map((aSymbol) => this.transformSymbol(aSymbol))
            .join(EBNFTransformer.SPACE + EBNFTransformer.OR_SEPARATOR + EBNFTransformer.SPACE);

        // 選択が2つ以上のシンボルを持つなら括弧を追加
        // bad: a|b c
        // good: (a|b)c
        if (operands.length > 1) {
            aString = EBNFTransformer.L_PER + aString + EBNFTransformer.R_PER;
        }

        return aString;
    }

    /**
     * 結合のシンボルをEBNFに変換する
     * @param aConcatenation 結合のシンボル
     * @return EBNFの文字列
     */
    protected transformConcatenation(aConcatenation: Concatenation): string {
        const operands = aConcatenation.expand();
        const aString = operands
            .map((aSymbol) => this.transformSymbol(aSymbol))
            .join(EBNFTransformer.SPACE);
        return aString;
    }

    /**
     * 閉包のシンボルをEBNFに変換する
     * @param aClosure 閉包のシンボル
     * @return EBNFの文字列
     */
    protected transformClosure(aClosure: Closure): string {
        const aChild = aClosure.getChild();
        let aString = this.transformSymbol(aChild);
        let suffixString = null;
        if (aClosure.isZeroOrMore()) {
            suffixString = EBNFTransformer.ZERO_OR_MORE;
        } else if (aClosure.isZeroOrOne()) {
            suffixString = EBNFTransformer.OPTIONAL;
        } else if (aClosure.isOneOrMore()) {
            suffixString = EBNFTransformer.ONE_OR_MORE;
        }

        if (suffixString === null) {
            const minRepeatCount = aClosure.getMinRepeatCount();
            const maxRepeatCount = aClosure.getMaxRepeatCount();
            return this.transformSymbol(
                Concatenation.fromArray(
                    new Array(minRepeatCount)
                        .fill(aChild)
                        .concat(
                            new Array(maxRepeatCount - minRepeatCount).fill(new ZeroOrOne(aChild))
                        )
                )
            );
        }

        if (![Leaf, Node, Alternation].some((aType) => aChild instanceof aType)) {
            // 子シンボルが終端もしくは非終端記号である時は括弧をつけない
            aString = EBNFTransformer.L_PER + aString + EBNFTransformer.R_PER;
        }
        return aString + suffixString;
    }

    /**
     * 終了状態のシンボルをEBNFに変換する
     * @param aLeaf 終了状態のシンボル
     * @return EBNFの文字列
     */
    protected transformLeaf(aLeaf: Leaf): string {
        if (aLeaf.equals(Leaf.Epsilon)) return "";
        const aSymbol = aLeaf.getName();
        const hasQuotation = aSymbol.includes(EBNFTransformer.QUOTATION);
        const hasDoubleQuotation = aSymbol.includes(EBNFTransformer.DOUBLE_QUOTATION);

        //クォーテーションとダブルクォーテーションが変わる部分で新しくLeafを生成する
        let quotation = EBNFTransformer.DOUBLE_QUOTATION;
        if (hasQuotation && hasDoubleQuotation) {
            const anArray = new Array<ASTSymbol>();
            let beforeIndex = 0;
            Array.from(aSymbol).forEach((aChar, index) => {
                if (aChar === quotation) {
                    anArray.push(new Leaf(aSymbol.slice(beforeIndex, index)));
                    beforeIndex = index;
                    quotation =
                        quotation === EBNFTransformer.DOUBLE_QUOTATION
                            ? EBNFTransformer.QUOTATION
                            : EBNFTransformer.QUOTATION;
                }
            });
            anArray.push(new Leaf(aSymbol.slice(beforeIndex)));
            return this.transformSymbol(Concatenation.fromArray(anArray));
        }
        if (hasDoubleQuotation) quotation = EBNFTransformer.QUOTATION;
        return quotation + aLeaf.getName() + quotation;
    }

    /**
     * 変数のシンボルをEBNFに変換する
     * @param aNode 変数のシンボル
     * @return EBNFの文字列
     */
    protected transformNode(aNode: Node): string {
        return aNode.getName();
    }

    /**
     * シンボルをEBNFに変換する
     * @param aSymbol EBNFに変換するシンボル
     * @returns 変換したEBNF
     */
    protected transformSymbol(aSymbol: ASTSymbol): string {
        let anEBNF = EBNFTransformer.memoMap.get(aSymbol);
        if (anEBNF !== null) return anEBNF;

        anEBNF = super.transformSymbol(aSymbol);

        EBNFTransformer.memoMap.set(aSymbol, anEBNF);
        return anEBNF;
    }

    /**
     * ASTをEBNFに変換する
     * @return 変換後のEBNF
     */
    transform(): string {
        return (
            this.anAST.getName() +
            EBNFTransformer.BIND +
            this.transformSymbol(this.anAST.getRoot()) +
            EBNFTransformer.END_OF_STATEMENT
        );
    }
}
