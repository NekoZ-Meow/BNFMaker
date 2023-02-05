import { ASTSymbol } from "../ASTSymbol";
/**
 * 抽象構文木のシンボルで子を2つ持つものを表すクラス
 */
export declare abstract class TwoChildrenSymbol extends ASTSymbol {
    protected car: ASTSymbol;
    protected cdr: ASTSymbol;
    /**
     * このオブジェクトを作成する
     * @param car 左側のシンボル
     * @param cdr 右側のシンボル
     */
    constructor(car: ASTSymbol, cdr: ASTSymbol);
    /**
     * 左のシンボルを返す
     * @returns 左のシンボル
     */
    getCar(): ASTSymbol;
    /**
     * 右のシンボルを返す
     * @returns 右のシンボル
     */
    getCdr(): ASTSymbol;
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
//# sourceMappingURL=TwoChildrenSymbol.d.ts.map