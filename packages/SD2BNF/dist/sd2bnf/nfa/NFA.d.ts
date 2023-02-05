import { AST } from "../ast/AST";
import { State } from "./State";
/**
 * 1つの非決定性有限オートマトンを表すクラス
 */
export declare class NFA extends Object {
    private name;
    private start;
    private end;
    /**
     * 非決定性有限オートマトンを生成する
     */
    constructor(name?: string);
    /**
     * 開始状態を追加する
     * @param aState 開始状態
     */
    addStart(aState: State): void;
    /**
     * 終了状態を追加する
     * @param aState 終了状態
     */
    addEnd(aState: State): void;
    /**
     * このNFAの名前を取得する
     * @returns このNFAの名前
     */
    getName(): string;
    /**
     * 状態をきれいに表示する文字列を返す
     * @param aState 表示する状態
     * @param indent インデント量
     * @param visited すでに参照した状態群
     * @returns 表示する文字列
     */
    private _prettyPrint;
    /**
     * このオートマトンをきれいに表示する
     */
    prettyPrint(): void;
    /**
     * このNFAの名前を設定する
     * @param name 設定する名前
     */
    setName(name: string): void;
    /**
     * このオートマトンを抽象構文木に変換する
     * @returns 抽象構文木
     */
    toAST(): AST;
}
//# sourceMappingURL=NFA.d.ts.map