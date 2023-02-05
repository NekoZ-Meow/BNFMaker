import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { State } from "./State";
/**
 * オートマトンにおける1つの遷移を表すクラス
 */
export declare class Transition extends Object {
    private from;
    private to;
    private symbol;
    /**
     * 遷移を作成する
     * @param from 遷移元
     * @param to 遷移先
     * @param symbol 遷移の名前
     */
    constructor(from: State, to: State, symbol: ASTSymbol);
    /**
     * この遷移を削除する
     */
    delete(): void;
    /**
     * この遷移の遷移元の状態を取得する
     * @returns 遷移元の状態
     */
    getFrom(): State;
    /**
     * 遷移するためのシンボルを取得する
     * @returns 遷移するためのシンボル
     */
    getSymbol(): ASTSymbol;
    /**
     * この遷移の遷移先の状態を取得する
     * @returns 遷移先の状態
     */
    getTo(): State;
}
//# sourceMappingURL=Transition.d.ts.map