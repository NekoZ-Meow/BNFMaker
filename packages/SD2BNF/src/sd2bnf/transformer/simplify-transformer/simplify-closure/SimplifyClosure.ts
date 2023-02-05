import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";

/**
 * 閉包のシンボルの簡略化に関する操作をまとめた名前空間
 */
export class SimplifyClosure extends Object {
    /**
     * 閉包シンボルの中に閉包シンボルが含まれており、合併できる場合は合併する
     *
     * Example: (a+)? => a*, (0 <= 1 <= 1 <= INF), 合併可能
     *          (aa?)* => (aa?)*, (0 <= 1 <= INF <= 2), (1 <= 0 <= 2 <= INF), 合併不可
     * @param aClosure 閉包のシンボル
     * @returns 合併した閉包のシンボル
     * 合併していないならそのまま返す
     */
    public static margeClosure(aClosure: Closure): Closure {
        const aChild = aClosure.getChild();
        if (aChild instanceof Closure) {
            const [aMinCount, aMaxCount] = [
                aClosure.getMinRepeatCount(),
                aClosure.getMaxRepeatCount(),
            ];
            const [anotherMinCount, anotherMaxCount] = [
                aChild.getMinRepeatCount(),
                aChild.getMaxRepeatCount(),
            ];
            // 与えられた数値列が連続かどうか
            const isContinuous = (...numbers: Array<number>): boolean => {
                if (numbers.length < 2) return true;
                return numbers.slice(0, -1).every((value, index) => value <= numbers[index + 1]);
            };
            const condition1 = isContinuous(aMinCount, anotherMinCount, aMaxCount, anotherMaxCount);
            const condition2 = isContinuous(anotherMinCount, aMinCount, anotherMaxCount, aMaxCount);
            if (condition1 || condition2) {
                return new Closure(
                    aChild.getChild(),
                    Math.min(aMinCount, anotherMinCount),
                    Math.max(aMaxCount, anotherMaxCount)
                );
            }
        }
        return aClosure;
    }
}
