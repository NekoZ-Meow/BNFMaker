import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { State } from "./State";

/**
 * オートマトンにおける1つの遷移を表すクラス
 */
export class Transition extends Object {
    private from: State;
    private to: State;
    private symbol: ASTSymbol;

    /**
     * 遷移を作成する
     * @param from 遷移元
     * @param to 遷移先
     * @param symbol 遷移の名前
     */
    constructor(from: State, to: State, symbol: ASTSymbol) {
        super();
        this.from = from;
        this.to = to;
        this.symbol = symbol;
    }

    /**
     * この遷移を削除する
     */
    public delete(): void {
        this.from.removeTransition(this);
        this.to.removeTransition(this);
    }

    /**
     * この遷移の遷移元の状態を取得する
     * @returns 遷移元の状態
     */
    public getFrom(): State {
        return this.from;
    }

    /**
     * 遷移するためのシンボルを取得する
     * @returns 遷移するためのシンボル
     */
    public getSymbol(): ASTSymbol {
        return this.symbol;
    }

    /**
     * この遷移の遷移先の状態を取得する
     * @returns 遷移先の状態
     */
    public getTo(): State {
        return this.to;
    }
}
