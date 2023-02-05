import { HashMap } from "hashed-collections";

import { AST } from "../../ast/AST";
import { ASTSymbol } from "../../ast/symbols/ASTSymbol";
import { Leaf } from "../../ast/symbols/leaf-symbol/Leaf";
import { Node } from "../../ast/symbols/leaf-symbol/Node";
import { Closure } from "../../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../ast/symbols/two-children-symbol/Concatenation";
import { Transformer } from "../Transformer";
import { SimplifyAlternation } from "./simplify-alternation/SimplifyAlternation";
import { SimplifyClosure } from "./simplify-closure/SimplifyClosure";
import { SimplifyConcatenation } from "./simplify-concatenation/SimplifyConcatenation";

/**
 * AST簡略化のための変換器
 */
export class SimplifyTransformer extends Transformer<AST, ASTSymbol> {
    // 同じシンボルが既に簡略化されていたらここから取り出す
    private static memoMap = new HashMap<ASTSymbol, ASTSymbol>();

    /**
     * 結合のシンボルを簡略化する
     * @param aConcatenation 結合のシンボル
     * @returns 簡略化後の結合シンボル
     */
    protected transformConcatenation(aConcatenation: Concatenation): ASTSymbol {
        const car = this.transformSymbol(aConcatenation.getCar());
        const cdr = this.transformSymbol(aConcatenation.getCdr());
        // イプシロン遷移を除去
        if (car.equals(Leaf.Epsilon)) return cdr;
        if (cdr.equals(Leaf.Epsilon)) return car;
        aConcatenation = new Concatenation(car, cdr);

        const broughtConcatenation =
            SimplifyConcatenation.bringConcatenationToRightSide(aConcatenation);
        if (broughtConcatenation !== aConcatenation) {
            return this.transformSymbol(broughtConcatenation);
        }

        const mergedSameClosureConcatenation =
            SimplifyConcatenation.mergeSameClosures(aConcatenation);
        if (mergedSameClosureConcatenation !== aConcatenation) {
            return this.transformSymbol(mergedSameClosureConcatenation);
        }

        const mergedConcatenation =
            SimplifyConcatenation.mergeConcatenationsIntoClosure(aConcatenation);
        if (mergedConcatenation !== aConcatenation) {
            return this.transformSymbol(mergedConcatenation);
        }

        return aConcatenation;
    }

    /**
     * 選択のシンボルを簡略化する
     * @param anAlternation 選択のシンボル
     * @returns 簡略化後の選択シンボル
     */
    protected transformAlternation(anAlternation: Alternation): ASTSymbol {
        const car = this.transformSymbol(anAlternation.getCar());
        const cdr = this.transformSymbol(anAlternation.getCdr());
        // 重複を削除
        if (car.equals(cdr)) return car;
        anAlternation = new Alternation(car, cdr);

        const epsilonRemovedOperand = SimplifyAlternation.toOptionalIfIncludeEpsilon(anAlternation);
        if (anAlternation !== epsilonRemovedOperand) {
            return this.transformSymbol(epsilonRemovedOperand);
        }

        const omitAffixOperand = SimplifyAlternation.omitAffix(anAlternation);
        if (omitAffixOperand !== anAlternation) {
            return this.transformSymbol(omitAffixOperand);
        }

        return anAlternation;
    }

    /**
     * 閉包のシンボルを簡略化する
     * @param aClosure 簡略化する閉包のシンボル
     * @return 簡略化後の閉包シンボル
     */
    protected transformClosure(aClosure: Closure): ASTSymbol {
        const aChild = this.transformSymbol(aClosure.getChild());
        // 子がイプシロン遷移なら子をそのまま返す
        if (aChild.equals(Leaf.Epsilon)) return Leaf.Epsilon;
        aClosure = new Closure(aChild, aClosure.getMinRepeatCount(), aClosure.getMaxRepeatCount());

        const mergedClosure = SimplifyClosure.margeClosure(aClosure);
        if (aClosure !== mergedClosure) {
            return this.transformSymbol(mergedClosure);
        }

        return aClosure;
    }

    /**
     * 終端記号を簡略化する(そのまま返す)
     * @param aLeaf 終端記号を簡略化する
     * @returns 簡略化後の終端記号
     */
    protected transformLeaf(aLeaf: Leaf) {
        return aLeaf;
    }

    /**
     * 変数のシンボルを簡略化する(そのまま返す)
     * @param aNode 変数のシンボル
     * @returns 簡略化した変数のシンボル
     */
    protected transformNode(aNode: Node): ASTSymbol {
        return aNode;
    }

    /**
     * シンボル単体を簡略化する
     * @param aSymbol 簡略化するシンボル
     * @returns 簡略化後のシンボル
     */
    protected transformSymbol(aSymbol: ASTSymbol): ASTSymbol {
        let simplifiedSymbol = SimplifyTransformer.memoMap.get(aSymbol);
        if (simplifiedSymbol !== null) return simplifiedSymbol;

        simplifiedSymbol = super.transformSymbol(aSymbol);

        SimplifyTransformer.memoMap.set(aSymbol, simplifiedSymbol);
        return simplifiedSymbol;
    }

    /**
     * AST簡略化のための変換器を生成する
     * @param anAST 簡略化するAST
     */
    constructor(anAST: AST) {
        super(anAST);
    }

    /**
     * ASTを簡略化する
     * @returns 簡略化後のAST
     */
    transform(): AST {
        return new AST(this.transformSymbol(this.anAST.getRoot()), this.anAST.getName());
    }
}
