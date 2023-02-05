import { ASTSymbol } from "../../ASTSymbol";
import { OneChildSymbol } from "../OneChildSymbol";

/**
 * Kleene閉包を表すクラス
 * Example: a*, a+, a?
 */
export class Closure extends OneChildSymbol {
    private maxRepeatCount: number; //繰り返しの最大回数
    private minRepeatCount: number; //繰り返しの最小回数

    /**
     * Kleene閉包を表すクラスを作成する
     * @param child 子のシンボル
     * @param minRepeatCount 繰り返しの最小回数
     * @param maxRepeatCount 繰り返しの最大回数
     */
    constructor(child: ASTSymbol, minRepeatCount = 0, maxRepeatCount = Number.POSITIVE_INFINITY) {
        super(child);
        if (
            minRepeatCount < 0 ||
            maxRepeatCount < 0 ||
            !Number.isInteger(minRepeatCount) ||
            (!Number.isInteger(maxRepeatCount) && maxRepeatCount !== Number.POSITIVE_INFINITY)
        ) {
            throw Error("繰り返しの回数は正の整数である必要があります");
        }
        if (maxRepeatCount < minRepeatCount) {
            throw Error("繰り返しの最大回数が最小回数よりも大きい必要があります");
        }
        this.minRepeatCount = minRepeatCount;
        this.maxRepeatCount = maxRepeatCount;
    }

    /**
     * オブジェクトが同値かどうか
     * @param _other 比較するオブジェクト
     * @returns 同値ならTrue
     */
    equals(_other: unknown): boolean {
        if (_other === null || _other === undefined) return false;
        if (!(_other instanceof Closure)) return false;
        if (this.hash() !== _other.hash()) return false;
        if (
            this.maxRepeatCount !== _other.getMaxRepeatCount() ||
            this.minRepeatCount !== _other.getMinRepeatCount()
        )
            return false;

        return this.child.equals(_other.child);
    }

    /**
     * 繰り返しの最大回数を取得する
     * @returns 繰り返しの最大回数
     */
    public getMaxRepeatCount(): number {
        return this.maxRepeatCount;
    }

    /**
     * 繰り返しの最小回数を取得する
     * @returns 繰り返しの最小回数
     */
    public getMinRepeatCount(): number {
        return this.minRepeatCount;
    }

    /**
     * このオブジェクトのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number {
        const anArray = new Array<number>();
        anArray.push(this.minRepeatCount);
        if (this.maxRepeatCount === Number.POSITIVE_INFINITY) {
            anArray.push(0);
        } else {
            anArray.push(this.maxRepeatCount);
        }
        anArray.push(super.hash());
        return anArray.reduce((prev, current) => (prev + current) % Number.MAX_SAFE_INTEGER, 0);
    }

    /**
     * この閉包シンボルが1回以上の繰り返しか
     * @returns 1回以上の繰り返しならTrue
     */
    public isOneOrMore(): boolean {
        return this.minRepeatCount === 1 && this.maxRepeatCount === Number.POSITIVE_INFINITY;
    }

    /**
     * この閉包シンボルが0回以上の繰り返しか
     * @returns 0回以上の繰り返しならTrue
     */
    public isZeroOrMore(): boolean {
        return this.minRepeatCount === 0 && this.maxRepeatCount === Number.POSITIVE_INFINITY;
    }

    /**
     * この閉包シンボルが0回か1回か
     * @returns 0回か1回ならTrue
     */
    public isZeroOrOne(): boolean {
        return this.minRepeatCount === 0 && this.maxRepeatCount === 1;
    }

    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string {
        return `Closure(${this.child.toString()}, {${this.minRepeatCount},${this.maxRepeatCount}})`;
    }
}
