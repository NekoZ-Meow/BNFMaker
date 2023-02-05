import { LeafSymbol } from "./LeafSymbol";

/**
 * 正規表現における不可分な最小単位である文字列
 * 例えば、Leaf("int")ならば(int|inn)などの正規表現でin(t|n)に簡略化されず、そのままになる
 * 簡略化したい場合は1文字ごとにこのオブジェクトを作成する
 */
export class Leaf extends LeafSymbol {
    static readonly Epsilon = new Leaf("");

    /**
     * 終端記号を作成する
     * @param name 名前
     */
    constructor(name: string) {
        super(name);
    }

    /**
     * シンボルが同じかどうか
     * @param _other 比較するシンボル
     * @returns 同じならtrue,異なるならfalseを返す
     */
    equals(_other: unknown): boolean {
        if (_other === null || _other === undefined) return false;
        if (!(_other instanceof Leaf)) return false;

        return this.name === _other.name;
    }

    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string {
        return this.name === "" ? "ε" : this.name;
    }
}
