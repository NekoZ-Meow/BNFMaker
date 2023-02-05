import { ASTSymbol } from "../ASTSymbol";
/**
 * 抽象構文木のシンボルで子を持たないものを表すクラス
 */
export declare abstract class LeafSymbol extends ASTSymbol {
    protected name: string;
    /**
     * 子を持たないシンボルを生成する
     * @param name シンボルの名前
     */
    constructor(name: string);
    /**
     * このシンボルの名前を取得する
     * @returns 名前
     */
    getName(): string;
    /**
     * このシンボルのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number;
    /**
     * このシンボルの大きさを返す
     * @returns シンボルの大きさ
     */
    size(): number;
}
//# sourceMappingURL=LeafSymbol.d.ts.map