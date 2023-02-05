import { LeafSymbol } from "./LeafSymbol";
/**
 * 代入された変数(非終端記号)を表すクラス
 * S ::= "a" というBNFにおける「S」を表す
 */
export declare class Node extends LeafSymbol {
    /**
     * 非終端記号を作成する
     * @param name 名前
     */
    constructor(name: string);
    /**
     * シンボルが同じかどうか
     * @param _other 比較するシンボル
     * @returns 同じならtrue,異なるならfalseを返す
     */
    equals(_other: unknown): boolean;
    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string;
}
//# sourceMappingURL=Node.d.ts.map