import { ASTSymbol } from "../ASTSymbol";
import { TwoChildrenSymbol } from "./TwoChildrenSymbol";
/**
 * 選択を表すシンボル
 * Example: (a|b)
 */
export declare class Alternation extends TwoChildrenSymbol {
    /**
     * シンボルの配列から選択のシンボルを作成す
     * 与えられた配列が空の場合はLeaf.Epsilon、長さが1の場合はそのシンボルをそのまま返す
     *
     * @param anArray シンボルの配列
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
     * ネストしている選択シンボルを展開し、配列にして返す
     *
     * 例： Alternation(a | Alternation(b | a)) => [a, b]
     */
    expand(): Array<ASTSymbol>;
    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string;
}
//# sourceMappingURL=Alternation.d.ts.map