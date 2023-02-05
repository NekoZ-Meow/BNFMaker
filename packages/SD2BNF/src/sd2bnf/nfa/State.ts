import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { Leaf } from "../ast/symbols/leaf-symbol/Leaf";
import { Closure } from "../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../ast/symbols/two-children-symbol/Concatenation";
import { Transition } from "./Transition";

/**
 * オートマトンの1つの状態を表す
 */
export class State extends Object {
    private entries = new Set<Transition>();
    private exits = new Set<Transition>();
    private loops = new Set<Transition>();
    private name: string;

    /**
     * 状態を作成する
     */
    constructor(name = "") {
        super();
        this.name = name;
    }

    /**
     * この状態に入ってくる遷移を追加する
     * @param aTransition 追加する遷移
     */
    private addEntry(aTransition: Transition): void {
        this.entries.add(aTransition);
        return;
    }

    /**
     * この状態から出ていく遷移を追加する
     * @param aTransition 追加する遷移
     */
    private addExits(aTransition: Transition): void {
        this.exits.add(aTransition);
        return;
    }

    /**
     * この状態を削除し、この状態により繋がれていた他の状態を繋ぐような新たな遷移を作成する
     */
    public merge(): void {
        let loopSymbol: ASTSymbol = Leaf.Epsilon;
        if (this.loops.size !== 0) {
            loopSymbol = new Closure(
                Alternation.fromArray(Array.from(this.loops).map((edge) => edge.getSymbol()))
            );
        }

        this.entries.forEach((entryEdge) => {
            const entryState = entryEdge.getFrom();
            this.exits.forEach((exitEdge) => {
                const exitState = exitEdge.getTo();
                entryState.transitionTo(
                    exitState,
                    Concatenation.fromArray([
                        entryEdge.getSymbol(),
                        loopSymbol,
                        exitEdge.getSymbol(),
                    ])
                );
            });
        });

        this.entries.forEach((aTransition) => {
            aTransition.delete();
        });
        this.exits.forEach((aTransition) => {
            aTransition.delete();
        });
    }

    /**
     * この状態から出ている遷移(自己ループを除く)を取得
     */
    public getExits() {
        return Array.from(this.exits);
    }

    /**
     * この状態に入っている遷移(自己ループを除く)を取得
     */
    public getEntries() {
        return Array.from(this.entries);
    }

    /**
     * この状態の自己ループを取得
     */
    public getLoops() {
        return Array.from(this.loops);
    }

    /**
     * この状態の名前を取得する
     */
    public getName() {
        return this.name;
    }

    /**
     * 遷移を削除する
     * @param aTransition 削除する遷移
     */
    public removeTransition(aTransition: Transition) {
        this.exits.delete(aTransition);
        this.entries.delete(aTransition);
        this.loops.delete(aTransition);
        return;
    }

    /**
     * このオブジェクトを文字列へ変換する
     * @returns このオブジェクトを表す文字列
     */
    toString(): string {
        return this.name;
    }

    /**
     * この状態からの遷移を追加する
     * @param aState 繋ぐ先の状態
     * @param aSymbol 抽象構文木のシンボル
     */
    public transitionTo(aState: State, aSymbol: ASTSymbol) {
        const aTransition: Transition = new Transition(this, aState, aSymbol);
        if (aState === this) {
            this.loops.add(aTransition);
        } else {
            this.addExits(aTransition);
            aState.addEntry(aTransition);
        }
    }
}
