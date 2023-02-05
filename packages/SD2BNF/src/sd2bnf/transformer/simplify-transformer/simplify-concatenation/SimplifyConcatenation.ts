import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
import { Concatenation } from "../../../ast/symbols/two-children-symbol/Concatenation";

/**
 * 結合のシンボルの簡略化に関する操作をまとめた名前空間
 */
export class SimplifyConcatenation {
    /**
     *  左側のConcatenationを右側に移す
     *
     *  Concat(Concat("b","a*"), Concat("a*",c))の時のような場合に対処するため
     * @param aConcatenation 結合のシンボル
     * @returns Concatenationを右側に移した結合のシンボル
     * 変更がなかった場合は与えられたConcatenationをそのまま返す
     */
    public static bringConcatenationToRightSide(aConcatenation: Concatenation): ASTSymbol {
        const [car, cdr] = [aConcatenation.getCar(), aConcatenation.getCdr()];
        if (car instanceof Concatenation) {
            return Concatenation.fromArray([car.getCar(), car.getCdr(), cdr]);
        }
        return aConcatenation;
    }

    /**
     * 結合のシンボルと閉包のシンボルを合併する
     *
     * Example: aa* => a+,
     *          a?a => Closure(a,{1,2})
     * @param aConcatenation 結合のシンボル
     * @returns 閉包シンボルに合併したシンボル
     * 変更がなかった場合はそのまま返す
     */
    public static mergeConcatenationsIntoClosure(aConcatenation: Concatenation) {
        const anArray = aConcatenation.expand();
        // console.log(`merge start: [ ${anArray.toString()} ]`);
        const lengthOfArray = anArray.length;
        while (true) {
            let merged = false;
            for (const [closureIndex, aSymbol] of anArray.entries()) {
                if (aSymbol instanceof Closure) {
                    const aChild = aSymbol.getChild();
                    for (const index of anArray.keys()) {
                        if (index === closureIndex) continue;
                        let [startIndex, endIndex] = [closureIndex + 1, index];
                        if (endIndex < startIndex)
                            [startIndex, endIndex] = [index, closureIndex - 1];
                        const partOfArray = anArray.slice(startIndex, endIndex + 1);
                        const partOfConcatenation = Concatenation.fromArray(partOfArray);

                        if (aChild.equals(partOfConcatenation)) {
                            anArray.splice(
                                Math.min(closureIndex, index),
                                partOfArray.length + 1,
                                new Closure(
                                    aChild,
                                    aSymbol.getMinRepeatCount() + 1,
                                    aSymbol.getMaxRepeatCount() + 1
                                )
                            );
                            merged = true;
                            break;
                        }
                    }
                    if (merged) break;
                }
            }
            if (!merged) break;
        }
        // console.log(`merge end: [ ${anArray.toString()} ]`);
        if (anArray.length === lengthOfArray) return aConcatenation;
        return Concatenation.fromArray(anArray);
    }

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
    public static mergeSameClosures(aConcatenation: Concatenation): Closure | Concatenation {
        const [car, cdr] = [aConcatenation.getCar(), aConcatenation.getCdr()];
        if (car instanceof Closure && cdr instanceof Closure) {
            if (car.getChild().equals(cdr.getChild())) {
                const minCount = car.getMinRepeatCount() + cdr.getMinRepeatCount();
                const maxCount = car.getMaxRepeatCount() + cdr.getMaxRepeatCount();
                return new Closure(car.getChild(), minCount, maxCount);
            }
        }
        return aConcatenation;
    }
}
