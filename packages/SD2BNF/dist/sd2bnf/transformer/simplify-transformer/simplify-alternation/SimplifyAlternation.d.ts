import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../../../ast/symbols/two-children-symbol/Alternation";
/**
 * 選択のシンボルの簡略化に関する操作をまとめた名前空間
 */
export declare class SimplifyAlternation extends Object {
    /**
     * もしイプシロンか0回か1回の閉包シンボルが含まれているなら0回から1回の閉包シンボルに変換する
     *
     * Example: (ε | a) => a?,
     *          (a?|b) => (a|b)?
     * @param anAlternation 選択のシンボル
     * @returns 変換後の閉包シンボル
     * 変換がないなら選択のシンボルをそのまま返す
     */
    static toOptionalIfIncludeEpsilon(anAlternation: Alternation): Closure | Alternation;
    /**
     * 省略可能な接辞を省略する
     *
     * Example: (abd | acd) => a(b | c)d
     * @param anAlternation 選択のシンボル
     * @returns 省略可能な接辞を省略したシンボル
     * 省略するものがないなら選択のシンボルをそのまま返す
     */
    static omitAffix(anAlternation: Alternation): ASTSymbol;
}
//# sourceMappingURL=SimplifyAlternation.d.ts.map