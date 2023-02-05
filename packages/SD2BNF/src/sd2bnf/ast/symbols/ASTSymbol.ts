import { Hashable } from "hashed-collections";

/**
 * 抽象構文木における1つの要素を表すクラス
 */
export abstract class ASTSymbol extends Object implements Hashable {
    /**
     * シンボルが同値かどうかを返す
     */
    abstract equals(_other: unknown): boolean;

    /**
     * シンボルのハッシュ値を返す
     */
    abstract hash(): number;

    /**
     * このシンボルの大きさ(子のシンボルをどれだけ持っているか)を返す
     */
    abstract size(): number;

    /**
     * このシンボルを文字列にして返す
     */
    abstract toString(): string;
}
