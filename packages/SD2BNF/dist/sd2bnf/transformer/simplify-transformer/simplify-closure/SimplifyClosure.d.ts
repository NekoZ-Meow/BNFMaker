import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
/**
 * 閉包のシンボルの簡略化に関する操作をまとめた名前空間
 */
export declare class SimplifyClosure extends Object {
    /**
     * 閉包シンボルの中に閉包シンボルが含まれており、合併できる場合は合併する
     *
     * Example: (a+)? => a*, (0 <= 1 <= 1 <= INF), 合併可能
     *          (aa?)* => (aa?)*, (0 <= 1 <= INF <= 2), (1 <= 0 <= 2 <= INF), 合併不可
     * @param aClosure 閉包のシンボル
     * @returns 合併した閉包のシンボル
     * 合併していないならそのまま返す
     */
    static margeClosure(aClosure: Closure): Closure;
}
//# sourceMappingURL=SimplifyClosure.d.ts.map