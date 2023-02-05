import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
import { Concatenation } from "../../../ast/symbols/two-children-symbol/Concatenation";
/**
 * 結合のシンボルの簡略化に関する操作をまとめた名前空間
 */
export declare class SimplifyConcatenation {
    /**
     *  左側のConcatenationを右側に移す
     *
     *  Concat(Concat("b","a*"), Concat("a*",c))の時のような場合に対処するため
     * @param aConcatenation 結合のシンボル
     * @returns Concatenationを右側に移した結合のシンボル
     * 変更がなかった場合は与えられたConcatenationをそのまま返す
     */
    static bringConcatenationToRightSide(aConcatenation: Concatenation): ASTSymbol;
    /**
     * 結合のシンボルと閉包のシンボルを合併する
     *
     * Example: aa* => a+,
     *          a?a => Closure(a,{1,2})
     * @param aConcatenation 結合のシンボル
     * @returns 閉包シンボルに合併したシンボル
     * 変更がなかった場合はそのまま返す
     */
    static mergeConcatenationsIntoClosure(aConcatenation: Concatenation): ASTSymbol;
    /**
     * 同じ子を持つClosureが連続していた場合まとめる
     *
     * Example: (a?a*) => a*,
     *          (a*a*) => a*,
     *          (a+a*) => a+
     * @param aConcatenation 結合のシンボル
     * @returns まとめた閉包シンボル。
     * 変更がなかった場合は与えられたConcatenationをそのまま返す
     */
    static mergeSameClosures(aConcatenation: Concatenation): Closure | Concatenation;
}
//# sourceMappingURL=SimplifyConcatenation.d.ts.map