import { HashSet } from "hashed-collections";

import { ASTSymbol } from "../ASTSymbol";
import { Leaf } from "../leaf-symbol/Leaf";
import { Concatenation } from "./Concatenation";
import { TwoChildrenSymbol } from "./TwoChildrenSymbol";

/**
 * 選択を表すシンボル
 * Example: (a|b)
 */
export class Alternation extends TwoChildrenSymbol {
    /**
     * シンボルの配列から選択のシンボルを作成す
     * 与えられた配列が空の場合はLeaf.Epsilon、長さが1の場合はそのシンボルをそのまま返す
     *
     * @param anArray シンボルの配列
     */
    static fromArray(anArray: Array<ASTSymbol>): ASTSymbol {
        //重複を削除。順序を保障するために1つずつ配列に追加
        anArray = Array.from(new HashSet<ASTSymbol>(...anArray).values());

        if (anArray.length <= 1) {
            return anArray.at(0) ?? Leaf.Epsilon;
        }
        return anArray.reduce((previous, current) => new Alternation(current, previous));
    }

    /**
     * このオブジェクトを作成する
     * @param car 左側のシンボル
     * @param cdr 右側のシンボル
     */
    constructor(car: ASTSymbol, cdr: ASTSymbol) {
        super(car, cdr);
        // Concatenationを左側に持ってくるために、まずAlternationを右側に持ってくる
        if (cdr instanceof Concatenation) {
            [car, cdr] = [cdr, car];
        }
        if (car instanceof Alternation) {
            this.car = car.getCar();
            this.cdr = new Alternation(car.getCdr(), cdr);
        }
        // Concatenationを左側に持ってくる
        if (this.cdr instanceof Alternation) {
            if (
                this.cdr.getCar() instanceof Concatenation &&
                !(this.car instanceof Concatenation)
            ) {
                const beforeLeft = this.car;
                this.car = this.cdr.getCar();
                this.cdr = new Alternation(beforeLeft, this.cdr.getCdr());
            }
        }
    }

    /**
     * シンボルが同じかどうか
     * @param _other 比較するシンボル
     * @returns 同じならtrue,異なるならfalseを返す
     */
    equals(_other: unknown): boolean {
        if (_other === null || _other === undefined) return false;
        if (!(_other instanceof Alternation)) return false;
        if (this.hash() !== _other.hash()) return false;

        const aSet = new HashSet<ASTSymbol>(...this.expand());
        const anotherSet = new HashSet<ASTSymbol>(..._other.expand());

        return aSet.equals(anotherSet);
    }

    /**
     * ネストしている選択シンボルを展開し、配列にして返す
     *
     * 例： Alternation(a | Alternation(b | a)) => [a, b]
     */
    public expand(): Array<ASTSymbol> {
        const aSet = new HashSet<ASTSymbol>();
        const aStack = new Array<Alternation>(this);
        while (aStack.length > 0) {
            const anAlternation = aStack.pop();
            if (anAlternation === undefined) continue;
            [anAlternation.getCar(), anAlternation.getCdr()].forEach((aSymbol) => {
                if (aSymbol instanceof Alternation) {
                    aStack.push(aSymbol);
                } else {
                    aSet.add(aSymbol);
                }
            });
        }
        return aSet.toArray();
    }

    /**
     * このシンボルを文字列に変換する
     * @returns このシンボルの文字列
     */
    toString(): string {
        return "Alt(" + this.car.toString() + ", " + this.cdr.toString() + ")";
    }
}
