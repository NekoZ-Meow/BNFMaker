import { ASTSymbol } from "../../ASTSymbol";
import { Closure } from "./Closure";

/**
 * 1回以上の繰り返しを表すクラス
 * a+
 */
export class OneOrMore extends Closure {
    /**
     * 1回以上の繰り返しを表すオブジェクトを作成する
     * @param child 子のシンボル
     */
    public constructor(child: ASTSymbol) {
        super(child, 1, Number.POSITIVE_INFINITY);
    }
}
