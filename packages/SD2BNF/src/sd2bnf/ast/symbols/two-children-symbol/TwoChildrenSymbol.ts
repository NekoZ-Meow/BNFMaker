import { ASTSymbol } from "../ASTSymbol";

/**
 * 抽象構文木のシンボルで子を2つ持つものを表すクラス
 */
export abstract class TwoChildrenSymbol extends ASTSymbol {
    protected car: ASTSymbol;
    protected cdr: ASTSymbol;

    /**
     * このオブジェクトを作成する
     * @param car 左側のシンボル
     * @param cdr 右側のシンボル
     */
    constructor(car: ASTSymbol, cdr: ASTSymbol) {
        super();
        this.car = car;
        this.cdr = cdr;
    }

    /**
     * 左のシンボルを返す
     * @returns 左のシンボル
     */
    public getCar(): ASTSymbol {
        return this.car;
    }

    /**
     * 右のシンボルを返す
     * @returns 右のシンボル
     */
    public getCdr(): ASTSymbol {
        return this.cdr;
    }

    /**
     * このシンボルのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number {
        return (this.car.hash() + this.cdr.hash()) % Number.MAX_SAFE_INTEGER;
    }

    /**
     * このシンボルの大きさを返す
     * @returns シンボルの大きさ
     */
    size(): number {
        return this.car.size() + this.cdr.size() + 1;
    }
}
