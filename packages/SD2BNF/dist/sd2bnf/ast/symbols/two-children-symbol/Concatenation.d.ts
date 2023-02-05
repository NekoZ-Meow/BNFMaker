import { ASTSymbol } from "../ASTSymbol";
import { TwoChildrenSymbol } from "./TwoChildrenSymbol";
/**
 * 2つの連続するシンボルの結合を表すクラス
 * Example: ab
 */
export declare class Concatenation extends TwoChildrenSymbol {
    /**
     * シンボルの配列から結合のシンボルを作成す
     * 与えられた配列が空の場合はイプシロン、長さが1の場合はそのシンボルをそのまま返す
     *
     * @param anArray シンボルの配列
     * @returns 変換後のシンボル
     */
    static fromArray(anArray: Array<ASTSymbol>): ASTSymbol;
    /**
     * このオブジェクトを作成する
     * @param car 左側のシンボル
     * @param cdr 右側のシンボル
     */
    constructor(car: ASTSymbol, cdr: ASTSymbol);
    /**
     * シンボルが同じかどうか
     * @param _other 比較するシンボル
     * @returns 同じならtrue,異なるならfalseを返す
     */
    equals(_other: unknown): boolean;
    /**
     * ネストしている結合シンボルを展開し、配列にして返す
     *
     * 例： Concatenation(a | Concatenation(b |c)) => [a, b, c]
     */
    expand(): Array<ASTSymbol>;
    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string;
}
//# sourceMappingURL=Concatenation.d.ts.map