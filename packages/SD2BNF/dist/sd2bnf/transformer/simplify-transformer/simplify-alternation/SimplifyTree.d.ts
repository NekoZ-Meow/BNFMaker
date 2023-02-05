import { ASTSymbol } from "../../../ast/symbols/ASTSymbol";
import { Alternation } from "../../../ast/symbols/two-children-symbol/Alternation";
/**
 * 分配法則を用いた選択の正規表現簡略化のためのTrieTree likeの木構造
 *
 * Example: (abd|acd) => a(bd|cd) : isSimplifySuffix = false
 *          (abd|acd) => (ab|ac)d : isSimplifySuffix = true
 */
export declare class SimplifyTree extends Object {
    private root;
    private isSimplifySuffix;
    private addCounter;
    /**
     * 分配法則を用いた選択の正規表現簡略化のための木構造を生成する
     * @param anAlternation 省略する選択のシンボル
     * @param isSimplifySuffix 接尾辞を省略するか、falseの場合接頭辞の省略になる
     */
    constructor(anAlternation: Alternation, isSimplifySuffix?: boolean);
    /**
     * ZeroOrMoreとZeroOrOne以外の閉包シンボルは扱いにくいので
     * 閉包シンボルをZeroOrMoreとZeroOrOneのみで表現する
     * @param aClosure 閉包のシンボル
     * @returns 別の方法で表したリスト
     */
    private transformClosureForSimplification;
    /**
     * 結合のシンボルを簡略化ために変換する
     * @param aConcatenation 結合のシンボル
     * @returns 変換後のシンボル
     */
    private transformConcatenationForSimplification;
    /**
     * この木にシンボルを追加する
     * @param aSymbol 追加するシンボル
     */
    private add;
    /**
     * 与えられたシンボルが既に簡略化されているか
     * @returns 簡略化されているならTrue、それ以外ならFalse
     */
    isSimplified(): boolean;
    /**
     * このグラフをきれいに出力する
     */
    private _prettyPrint;
    /**
     * このオブジェクトをきれいに出力する
     */
    prettyPrint(): void;
    /**
     * このグラフから簡略化したシンボルを生成し返す
     * @returns 簡略化したシンボル
     */
    private _simplify;
    /**
     * このグラフから簡略化したシンボルを生成し返す
     * @returns 簡略化したシンボル
     */
    simplify(): ASTSymbol;
}
//# sourceMappingURL=SimplifyTree.d.ts.map