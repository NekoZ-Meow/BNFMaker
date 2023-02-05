import { EBNFTransformer } from "../transformer/ebnf-transformer/EBNFTransformer";
import { SimplifyTransformer } from "../transformer/simplify-transformer/SimplifyTransformer";
import { ASTSymbol } from "./symbols/ASTSymbol";
import { Leaf } from "./symbols/leaf-symbol/Leaf";

/**
 * BNFの抽象構文木を表すクラス
 */
export class AST extends Object {
    private root: ASTSymbol;
    private name: string;

    /**
     * 抽象構文木を作成する
     * @param root 開始地点となるシンボル
     */
    constructor(root: ASTSymbol = Leaf.Epsilon, name = "") {
        super();
        this.root = root;
        this.name = name;
    }

    /**
     * オブジェクトが同値かどうか
     * @param _other 比較するオブジェクト
     * @returns 同値ならTrue
     */
    public equals(_other: unknown): boolean {
        if (_other === null || _other === undefined) return false;
        if (!(_other instanceof AST)) return false;

        return this.name === _other.name && this.root.equals(_other.root);
    }

    /**
     * このASTの名前を取得する
     * @returns このASTの名前
     */
    public getName(): string {
        return this.name;
    }

    /**
     * 根となるシンボルを取得する
     * @returns 根となるシンボル
     */
    public getRoot(): ASTSymbol {
        return this.root;
    }

    /**
     * このASTの名前を設定する
     * @returns 設定するASTの名前
     */
    public setName(name: string): void {
        this.name = name;
        return;
    }

    /**
     * 根となるシンボルを設定する
     * @param root 根となるシンボル
     */
    public setRoot(root: ASTSymbol): void {
        this.root = root;
    }

    /**
     * この抽象構文木を簡略化する
     * @returns 簡略化した抽象構文木
     */
    public simplify(): AST {
        return new SimplifyTransformer(this).transform();
    }

    /**
     * この抽象構文木をEBNFに変換する
     * @returns EBNFの文字列
     */
    public toEBNF(): string {
        const simplify = new SimplifyTransformer(this).transform();
        return new EBNFTransformer(simplify).transform();
    }

    /**
     * このオブジェクトを文字列に変換する
     * @returns このオブジェクトを表す文字列
     */
    toString(): string {
        return `AST(${this.root.toString()})`;
    }
}
