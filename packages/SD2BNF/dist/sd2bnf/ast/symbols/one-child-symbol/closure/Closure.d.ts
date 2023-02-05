import { ASTSymbol } from "../../ASTSymbol";
import { OneChildSymbol } from "../OneChildSymbol";
/**
 * Kleene閉包を表すクラス
 * Example: a*, a+, a?
 */
export declare class Closure extends OneChildSymbol {
    private maxRepeatCount;
    private minRepeatCount;
    /**
     * Kleene閉包を表すクラスを作成する
     * @param child 子のシンボル
     * @param minRepeatCount 繰り返しの最小回数
     * @param maxRepeatCount 繰り返しの最大回数
     */
    constructor(child: ASTSymbol, minRepeatCount?: number, maxRepeatCount?: number);
    /**
     * オブジェクトが同値かどうか
     * @param _other 比較するオブジェクト
     * @returns 同値ならTrue
     */
    equals(_other: unknown): boolean;
    /**
     * 繰り返しの最大回数を取得する
     * @returns 繰り返しの最大回数
     */
    getMaxRepeatCount(): number;
    /**
     * 繰り返しの最小回数を取得する
     * @returns 繰り返しの最小回数
     */
    getMinRepeatCount(): number;
    /**
     * このオブジェクトのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number;
    /**
     * この閉包シンボルが1回以上の繰り返しか
     * @returns 1回以上の繰り返しならTrue
     */
    isOneOrMore(): boolean;
    /**
     * この閉包シンボルが0回以上の繰り返しか
     * @returns 0回以上の繰り返しならTrue
     */
    isZeroOrMore(): boolean;
    /**
     * この閉包シンボルが0回か1回か
     * @returns 0回か1回ならTrue
     */
    isZeroOrOne(): boolean;
    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string;
}
//# sourceMappingURL=Closure.d.ts.map