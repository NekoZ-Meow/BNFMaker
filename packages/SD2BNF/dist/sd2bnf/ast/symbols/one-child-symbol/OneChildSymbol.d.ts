import { ASTSymbol } from "../ASTSymbol";
/**
 * 抽象構文木のシンボルで子を1つ持つものを表すクラス
 */
export declare abstract class OneChildSymbol extends ASTSymbol {
    protected child: ASTSymbol;
    /**
     * 子を1つ持つシンボルを生成する
     * @param child 子のシンボル
     */
    constructor(child: ASTSymbol);
    /**
     * 子のシンボルを取得する
     * @returns 子のシンボル
     */
    getChild(): ASTSymbol;
    /**
     * このオブジェクトのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number;
    /**
     * このシンボルの大きさを返す
     * @returns シンボルの大きさ
     */
    size(): number;
}
//# sourceMappingURL=OneChildSymbol.d.ts.map