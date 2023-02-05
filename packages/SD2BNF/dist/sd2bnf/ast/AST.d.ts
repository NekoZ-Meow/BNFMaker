import { ASTSymbol } from "./symbols/ASTSymbol";
/**
 * BNFの抽象構文木を表すクラス
 */
export declare class AST extends Object {
    private root;
    private name;
    /**
     * 抽象構文木を作成する
     * @param root 開始地点となるシンボル
     */
    constructor(root?: ASTSymbol, name?: string);
    /**
     * オブジェクトが同値かどうか
     * @param _other 比較するオブジェクト
     * @returns 同値ならTrue
     */
    equals(_other: unknown): boolean;
    /**
     * このASTの名前を取得する
     * @returns このASTの名前
     */
    getName(): string;
    /**
     * 根となるシンボルを取得する
     * @returns 根となるシンボル
     */
    getRoot(): ASTSymbol;
    /**
     * このASTの名前を設定する
     * @returns 設定するASTの名前
     */
    setName(name: string): void;
    /**
     * 根となるシンボルを設定する
     * @param root 根となるシンボル
     */
    setRoot(root: ASTSymbol): void;
    /**
     * この抽象構文木を簡略化する
     * @returns 簡略化した抽象構文木
     */
    simplify(): AST;
    /**
     * この抽象構文木をEBNFに変換する
     * @returns EBNFの文字列
     */
    toEBNF(): string;
    /**
     * このオブジェクトを文字列に変換する
     * @returns このオブジェクトを表す文字列
     */
    toString(): string;
}
//# sourceMappingURL=AST.d.ts.map