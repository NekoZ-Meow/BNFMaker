import { ASTSymbol } from "../ASTSymbol";
import { Leaf } from "../leaf-symbol/Leaf";
import { TwoChildrenSymbol } from "./TwoChildrenSymbol";

/**
 * 2つの連続するシンボルの結合を表すクラス
 * Example: ab
 */
export class Concatenation extends TwoChildrenSymbol {
    /**
     * シンボルの配列から結合のシンボルを作成す
     * 与えられた配列が空の場合はイプシロン、長さが1の場合はそのシンボルをそのまま返す
     *
     * @param anArray シンボルの配列
     * @returns 変換後のシンボル
     */
    static fromArray(anArray: Array<ASTSymbol>): ASTSymbol {
        anArray = anArray.filter((aSymbol) => !aSymbol.equals(Leaf.Epsilon));
        if (anArray.length <= 1) {
            return anArray.at(0) ?? Leaf.Epsilon;
        }
        return anArray
            .reverse()
            .reduce((previous, current) => new Concatenation(current, previous));
    }

    /**
     * このオブジェクトを作成する
     * @param car 左側のシンボル
     * @param cdr 右側のシンボル
     */
    constructor(car: ASTSymbol, cdr: ASTSymbol) {
        super(car, cdr);
    }

    /**
     * シンボルが同じかどうか
     * @param _other 比較するシンボル
     * @returns 同じならtrue,異なるならfalseを返す
     */
    equals(_other: unknown): boolean {
        if (_other === null || _other === undefined) return false;
        if (!(_other instanceof Concatenation)) return false;
        if (this.hash() !== _other.hash()) return false;

        const anArray = this.expand();
        const anotherArray = _other.expand();
        if (anArray.length !== anotherArray.length) return false;
        return anArray.every((aSymbol, index) => aSymbol.equals(anotherArray.at(index)));
    }

    /**
     * ネストしている結合シンボルを展開し、配列にして返す
     *
     * 例： Concatenation(a | Concatenation(b |c)) => [a, b, c]
     */
    public expand(): Array<ASTSymbol> {
        let anArray = new Array<ASTSymbol>();
        [this.car, this.cdr].forEach((aSymbol) => {
            if (aSymbol instanceof Concatenation) {
                anArray = anArray.concat(aSymbol.expand());
            } else {
                anArray.push(aSymbol);
            }
        });
        return anArray;
    }

    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string {
        return "Concat(" + this.car.toString() + ", " + this.cdr.toString() + ")";
    }
}
