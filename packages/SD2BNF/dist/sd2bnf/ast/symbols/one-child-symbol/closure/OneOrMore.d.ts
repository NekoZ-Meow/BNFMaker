import { ASTSymbol } from "../../ASTSymbol";
import { Closure } from "./Closure";
/**
 * 1回以上の繰り返しを表すクラス
 * a+
 */
export declare class OneOrMore extends Closure {
    /**
     * 1回以上の繰り返しを表すオブジェクトを作成する
     * @param child 子のシンボル
     */
    constructor(child: ASTSymbol);
}
//# sourceMappingURL=OneOrMore.d.ts.map