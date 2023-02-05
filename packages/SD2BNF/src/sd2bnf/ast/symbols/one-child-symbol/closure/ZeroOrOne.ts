import { ASTSymbol } from "../../ASTSymbol";
import { Closure } from "./Closure";

/**
 * 0回か1回を表すクラス
 * a?
 */
export class ZeroOrOne extends Closure {
    /**
     * 0回か1回を表すオブジェクトを作成する
     * @param child 子のシンボル
     */
    public constructor(child: ASTSymbol) {
        super(child, 0, 1);
    }
}
