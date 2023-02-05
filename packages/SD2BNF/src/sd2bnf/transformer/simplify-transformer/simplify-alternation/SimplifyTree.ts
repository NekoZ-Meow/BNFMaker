import { HashMap } from "hashed-collections";
import { EOL } from "os";

import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Leaf } from "../../../ast/symbols/leaf-symbol/Leaf";
import { Closure } from "../../../ast/symbols/one-child-symbol/closure/Closure";
import { ZeroOrMore } from "../../../ast/symbols/one-child-symbol/closure/ZeroOrMore";
import { ZeroOrOne } from "../../../ast/symbols/one-child-symbol/closure/ZeroOrOne";
import { Alternation } from "../../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../../ast/symbols/two-children-symbol/Concatenation";

/**
 * 木構造の1つのノードを表すクラス
 */
class TreeNode extends Object {
    public isEnd = false; //終了状態かどうか
    private next = new HashMap<ASTSymbol, TreeNode>(); //繋がっているシンボルとノード辞書

    /**
     * ノードを生成する
     */
    constructor() {
        super();
    }

    /**
     * 次のシンボルを繋げる
     * @param aSymbol 次のシンボル
     * @returns 次のノード
     */
    public addNext(aSymbol: ASTSymbol): TreeNode {
        let aNode = this.next.get(aSymbol);
        if (aNode === null) {
            aNode = new TreeNode();
            this.next.set(aSymbol, aNode);
        }

        return aNode;
    }

    /**
     * このノードに繋がっているシンボルとノードのつながりを取得する
     * @returns このノードに繋がっているシンボルとノードのつながり
     */
    public getNext(): HashMap<ASTSymbol, TreeNode> {
        return this.next;
    }
}

/**
 * 分配法則を用いた選択の正規表現簡略化のためのTrieTree likeの木構造
 *
 * Example: (abd|acd) => a(bd|cd) : isSimplifySuffix = false
 *          (abd|acd) => (ab|ac)d : isSimplifySuffix = true
 */
export class SimplifyTree extends Object {
    private root = new TreeNode();
    private isSimplifySuffix: boolean;
    private addCounter = 0;

    /**
     * 分配法則を用いた選択の正規表現簡略化のための木構造を生成する
     * @param anAlternation 省略する選択のシンボル
     * @param isSimplifySuffix 接尾辞を省略するか、falseの場合接頭辞の省略になる
     */
    constructor(anAlternation: Alternation, isSimplifySuffix = false) {
        super();
        this.isSimplifySuffix = isSimplifySuffix;
        this.add(anAlternation);
        this.prettyPrint();
    }

    /**
     * ZeroOrMoreとZeroOrOne以外の閉包シンボルは扱いにくいので
     * 閉包シンボルをZeroOrMoreとZeroOrOneのみで表現する
     * @param aClosure 閉包のシンボル
     * @returns 別の方法で表したリスト
     */
    private transformClosureForSimplification(aClosure: Closure): Array<ASTSymbol> {
        const aChild = aClosure.getChild();
        const minRepeatCount = aClosure.getMinRepeatCount();
        const maxRepeatCount = aClosure.getMaxRepeatCount();
        if (aClosure.isZeroOrOne() || aClosure.isZeroOrMore()) {
            return [aClosure];
        }

        const anArray = new Array(minRepeatCount).fill(aChild);
        if (maxRepeatCount === Number.POSITIVE_INFINITY) {
            anArray.push(new ZeroOrMore(aChild));
        } else {
            anArray.push(...new Array(maxRepeatCount - minRepeatCount).fill(new ZeroOrOne(aChild)));
        }
        return anArray;
    }

    /**
     * 結合のシンボルを簡略化ために変換する
     * @param aConcatenation 結合のシンボル
     * @returns 変換後のシンボル
     */
    private transformConcatenationForSimplification(
        aConcatenation: Concatenation
    ): Array<ASTSymbol> {
        const anArray = aConcatenation.expand().flatMap((aSymbol) => {
            if (aSymbol instanceof Closure) return this.transformClosureForSimplification(aSymbol);
            return [aSymbol];
        });
        if (this.isSimplifySuffix) anArray.reverse();
        return anArray;
    }

    /**
     * この木にシンボルを追加する
     * @param aSymbol 追加するシンボル
     */
    private add(aSymbol: ASTSymbol): void {
        let aNode = this.root;
        if (aSymbol instanceof Concatenation) {
            this.transformConcatenationForSimplification(aSymbol).forEach((aSymbol) => {
                aNode = aNode.addNext(aSymbol);
            });
        } else if (aSymbol instanceof Alternation) {
            const anArray = aSymbol.expand();
            anArray.forEach((aSymbol) => {
                this.add(aSymbol);
            });
            return;
        } else if (aSymbol instanceof Closure) {
            const anotherOperand = Concatenation.fromArray(
                this.transformClosureForSimplification(aSymbol)
            );
            if (anotherOperand.equals(aSymbol)) {
                aNode = aNode.addNext(anotherOperand);
            } else {
                this.add(anotherOperand);
                return;
            }
        } else {
            aNode = aNode.addNext(aSymbol);
        }
        this.addCounter += 1;
        aNode.isEnd = true;
    }

    /**
     * 与えられたシンボルが既に簡略化されているか
     * @returns 簡略化されているならTrue、それ以外ならFalse
     */
    public isSimplified(): boolean {
        return this.root.getNext().size() === this.addCounter;
    }

    /**
     * このグラフをきれいに出力する
     */
    private _prettyPrint(aNode: TreeNode, indent: number, visited: Set<TreeNode>): string {
        if (visited.has(aNode)) return "";
        let aString = "";
        const indentSpace = new Array(indent).fill(" ").join("");
        if (aNode.isEnd) {
            aString += indentSpace + "<E>" + EOL;
        }
        aNode.getNext().forEach((nextNode, aSymbol) => {
            aString += indentSpace + aSymbol.toString() + EOL;
            aString += this._prettyPrint(nextNode, indent + 4, visited);
            visited.add(nextNode);
        });
        return aString;
    }

    /**
     * このオブジェクトをきれいに出力する
     */
    public prettyPrint() {
        console.log(this._prettyPrint(this.root, 0, new Set()));
    }

    /**
     * このグラフから簡略化したシンボルを生成し返す
     * @returns 簡略化したシンボル
     */
    private _simplify(aNode: TreeNode): ASTSymbol {
        const anArray = new Array<ASTSymbol>();
        if (aNode.isEnd) anArray.push(Leaf.Epsilon); //終了状態ならイプシロンを追加
        aNode.getNext().forEach((nextNode, aSymbol) => {
            if (this.isSimplifySuffix) {
                anArray.push(Concatenation.fromArray([this._simplify(nextNode), aSymbol]));
            } else {
                anArray.push(Concatenation.fromArray([aSymbol, this._simplify(nextNode)]));
            }
        });

        return Alternation.fromArray(anArray);
    }

    /**
     * このグラフから簡略化したシンボルを生成し返す
     * @returns 簡略化したシンボル
     */
    public simplify(): ASTSymbol {
        return this._simplify(this.root);
    }
}
