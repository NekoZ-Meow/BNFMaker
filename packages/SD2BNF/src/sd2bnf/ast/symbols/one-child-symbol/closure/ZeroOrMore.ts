import { ASTSymbol } from "../../ASTSymbol";
import { Closure } from "./Closure";

/**
 * 0回以上の繰り返しを表すクラス
 * a*
 */
export class ZeroOrMore extends Closure {
    /**
     * 0回以上の繰り返しを表すオブジェクトを作成する
     * @param child 子のシンボル
     */
    public constructor(child: ASTSymbol) {
        super(child, 0, Number.POSITIVE_INFINITY);
    }
}
