import { HashMap } from "hashed-collections";
import { EOL } from "os";

import { AST } from "../ast/AST";
import { ASTSymbol } from "../ast/symbols/ASTSymbol";
import { Leaf } from "../ast/symbols/leaf-symbol/Leaf";
import { Alternation } from "../ast/symbols/two-children-symbol/Alternation";
import { State } from "./State";

/**
 * 1つの非決定性有限オートマトンを表すクラス
 */
export class NFA extends Object {
    private name: string;
    private start: State;
    private end: State;

    /**
     * 非決定性有限オートマトンを生成する
     */
    constructor(name = "") {
        super();
        this.name = name;
        this.start = new State("<S>");
        this.end = new State("<E>");
    }

    /**
     * 開始状態を追加する
     * @param aState 開始状態
     */
    public addStart(aState: State): void {
        this.start.transitionTo(aState, Leaf.Epsilon);
        return;
    }

    /**
     * 終了状態を追加する
     * @param aState 終了状態
     */
    public addEnd(aState: State): void {
        aState.transitionTo(this.end, Leaf.Epsilon);
        return;
    }

    /**
     * このNFAの名前を取得する
     * @returns このNFAの名前
     */
    public getName(): string {
        return this.name;
    }

    /**
     * 状態をきれいに表示する文字列を返す
     * @param aState 表示する状態
     * @param indent インデント量
     * @param visited すでに参照した状態群
     * @returns 表示する文字列
     */
    private _prettyPrint(aState: State, indent: number, visited: Set<State>): string {
        const indentString = Array(indent).fill(" ").join("");
        const aBuilder = new Array<string>();
        aBuilder.push(aState.toString(), EOL);
        if (!visited.has(aState)) {
            visited.add(aState);

            const aMap = new HashMap<ASTSymbol, Set<State>>();
            aState
                .getExits()
                .concat(...aState.getLoops())
                .forEach((aTransition) => {
                    const aSymbol = aTransition.getSymbol();
                    const transitionState = aTransition.getTo();
                    aMap.setDefault(aSymbol, new Set<State>());
                    aMap.get(aSymbol)?.add(transitionState);
                });

            const comparator = (
                anEntry: [ASTSymbol, Set<State>],
                anotherEntry: [ASTSymbol, Set<State>]
            ) => {
                const aString = anEntry[0].toString();
                const anotherString = anotherEntry[0].toString();

                if (aString === anotherString) return 0;
                if (aString > anotherString) return 1;
                return -1;
            };

            Array.from(aMap.entries())
                .sort((a, b) => comparator(a, b))
                .forEach(([aSymbol, aSet]) => {
                    const symbolString = aSymbol.toString();
                    aBuilder.push(indentString, symbolString, EOL);
                    aSet.forEach((transitionState) => {
                        aBuilder.push(
                            indentString,
                            Array((symbolString.length / 2) | 0)
                                .fill(" ")
                                .join(""),
                            "|---"
                        );
                        aBuilder.push(this._prettyPrint(transitionState, indent + 4, visited));
                    });
                });
        }

        return aBuilder.join("");
    }

    /**
     * このオートマトンをきれいに表示する
     */
    public prettyPrint(): void {
        console.log(this._prettyPrint(this.start, 0, new Set<State>()));
        return;
    }

    /**
     * このNFAの名前を設定する
     * @param name 設定する名前
     */
    public setName(name: string): void {
        this.name = name;
        return;
    }

    /**
     * このオートマトンを抽象構文木に変換する
     * @returns 抽象構文木
     */
    public toAST(): AST {
        while (true) {
            if (this.start.getExits().length == 0) {
                throw Error("error : startとendが繋がっていません。");
            }
            let removeNode = null;
            for (const anEdge of this.start.getExits()) {
                if (anEdge.getTo() !== this.end) {
                    removeNode = anEdge.getTo();
                    break;
                }
            }
            if (removeNode === null) break;
            removeNode.merge();
        }
        return new AST(
            Alternation.fromArray(this.start.getExits().map((anEdge) => anEdge.getSymbol())),
            this.name
        );
    }
}
