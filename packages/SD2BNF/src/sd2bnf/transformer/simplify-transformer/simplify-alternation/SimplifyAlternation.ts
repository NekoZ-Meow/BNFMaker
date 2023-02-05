import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Leaf } from "../../../ast/symbols/leaf-symbol/Leaf";
import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
import { ZeroOrOne } from "../../../ast/symbols/one-child-symbol/closure/ZeroOrOne";
import { Alternation } from "../../../ast/symbols/two-children-symbol/Alternation";
import { SimplifyTree } from "./SimplifyTree";

/**
 * 選択のシンボルの簡略化に関する操作をまとめた名前空間
 */
export class SimplifyAlternation extends Object {
    /**
     * もしイプシロンか0回か1回の閉包シンボルが含まれているなら0回から1回の閉包シンボルに変換する
     *
     * Example: (ε | a) => a?,
     *          (a?|b) => (a|b)?
     * @param anAlternation 選択のシンボル
     * @returns 変換後の閉包シンボル
     * 変換がないなら選択のシンボルをそのまま返す
     */
    public static toOptionalIfIncludeEpsilon(anAlternation: Alternation): Closure | Alternation {
        const [car, cdr] = [anAlternation.getCar(), anAlternation.getCdr()];
        const anArray = new Array<[ASTSymbol, ASTSymbol]>([car, cdr], [cdr, car]);

        for (const [aSymbol, anotherOperand] of anArray) {
            if (aSymbol.equals(Leaf.Epsilon)) {
                return new ZeroOrOne(anotherOperand);
            } else if (aSymbol instanceof Closure && aSymbol.isZeroOrOne()) {
                return new ZeroOrOne(new Alternation(aSymbol.getChild(), anotherOperand));
            }
        }

        return anAlternation;
    }

    /**
     * 省略可能な接辞を省略する
     *
     * Example: (abd | acd) => a(b | c)d
     * @param anAlternation 選択のシンボル
     * @returns 省略可能な接辞を省略したシンボル
     * 省略するものがないなら選択のシンボルをそのまま返す
     */
    public static omitAffix(anAlternation: Alternation) {
        const prefixTree = new SimplifyTree(anAlternation, false);
        if (!prefixTree.isSimplified()) {
            return prefixTree.simplify();
        }
        const suffixTree = new SimplifyTree(anAlternation, true);
        if (!suffixTree.isSimplified()) {
            return suffixTree.simplify();
        }
        return anAlternation;
    }
}
