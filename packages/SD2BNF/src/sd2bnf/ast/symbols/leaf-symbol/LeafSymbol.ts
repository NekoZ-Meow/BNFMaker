import { StringUtility } from "../../../../utils/StringUtility";
import { ASTSymbol } from "../ASTSymbol";

/**
 * 抽象構文木のシンボルで子を持たないものを表すクラス
 */
export abstract class LeafSymbol extends ASTSymbol {
    protected name: string;

    /**
     * 子を持たないシンボルを生成する
     * @param name シンボルの名前
     */
    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * このシンボルの名前を取得する
     * @returns 名前
     */
    getName(): string {
        return this.name;
    }

    /**
     * このシンボルのハッシュ値を返す
     * @returns ハッシュ値
     */
    hash(): number {
        return StringUtility.stringToHash(this.name) % Number.MAX_SAFE_INTEGER;
    }

    /**
     * このシンボルの大きさを返す
     * @returns シンボルの大きさ
     */
    size(): number {
        return 1;
    }
}
