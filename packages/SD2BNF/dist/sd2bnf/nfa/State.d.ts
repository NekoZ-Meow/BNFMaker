import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { Transition } from "./Transition";
/**
 * オートマトンの1つの状態を表す
 */
export declare class State extends Object {
    private entries;
    private exits;
    private loops;
    private name;
    /**
     * 状態を作成する
     */
    constructor(name?: string);
    /**
     * この状態に入ってくる遷移を追加する
     * @param aTransition 追加する遷移
     */
    private addEntry;
    /**
     * この状態から出ていく遷移を追加する
     * @param aTransition 追加する遷移
     */
    private addExits;
    /**
     * この状態を削除し、この状態により繋がれていた他の状態を繋ぐような新たな遷移を作成する
     */
    merge(): void;
    /**
     * この状態から出ている遷移(自己ループを除く)を取得
     */
    getExits(): Transition[];
    /**
     * この状態に入っている遷移(自己ループを除く)を取得
     */
    getEntries(): Transition[];
    /**
     * この状態の自己ループを取得
     */
    getLoops(): Transition[];
    /**
     * この状態の名前を取得する
     */
    getName(): string;
    /**
     * 遷移を削除する
     * @param aTransition 削除する遷移
     */
    removeTransition(aTransition: Transition): void;
    /**
     * このオブジェクトを文字列へ変換する
     * @returns このオブジェクトを表す文字列
     */
    toString(): string;
    /**
     * この状態からの遷移を追加する
     * @param aState 繋ぐ先の状態
     * @param aSymbol 抽象構文木のシンボル
     */
    transitionTo(aState: State, aSymbol: ASTSymbol): void;
}
//# sourceMappingURL=State.d.ts.map