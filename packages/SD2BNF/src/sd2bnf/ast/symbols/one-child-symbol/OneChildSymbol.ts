import { ASTSymbol } from "../ASTSymbol";

/**
 * 抽象構文木のシンボルで子を1つ持つものを表すクラス
 */
export abstract class OneChildSymbol extends ASTSymbol {
    protected child: ASTSymbol;

    /**
     * 子を1つ持つシンボルを生成する
     * @param child 子のシンボル
     */
    constructor(child: ASTSymbol) {
        super();
        this.child = child;
    }

    /**
     * 子のシンボルを取得する
     * @returns 子のシンボル
     */
    public getChild(): ASTSymbol {
        return this.child;
    }

    /**
     * このオブジェクトのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number {
        return this.child.hash() % Number.MAX_SAFE_INTEGER;
    }

    /**
     * このシンボルの大きさを返す
     * @returns シンボルの大きさ
     */
    size(): number {
        return this.child.size() + 1;
    }
}
