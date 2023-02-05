import { ASTSymbol } from "../../ASTSymbol";
import { Closure } from "./Closure";
/**
 * 0回以上の繰り返しを表すクラス
 * a*
 */
export declare class ZeroOrMore extends Closure {
    /**
     * 0回以上の繰り返しを表すオブジェクトを作成する
     * @param child 子のシンボル
     */
    constructor(child: ASTSymbol);
}
//# sourceMappingURL=ZeroOrMore.d.ts.map