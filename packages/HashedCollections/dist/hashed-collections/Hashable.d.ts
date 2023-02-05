/**
 * ハッシュ化可能を表すインターフェース
 */
export interface Hashable {
    /**
     * このオブジェクトのハッシュ値を正の整数で返す
     */
    hash(): number;
    /**
     * オブジェクトが同値かどうか
     * @param other 比較するオブジェクト
     * @return 同値ならtrue、それ以外ならfalse
     */
    equals(other: unknown): boolean;
}
//# sourceMappingURL=Hashable.d.ts.map