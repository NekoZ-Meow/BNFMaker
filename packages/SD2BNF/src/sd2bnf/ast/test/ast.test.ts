import { AST } from "../AST";
import { Leaf } from "../symbols/leaf-symbol/Leaf";
import { Alternation } from "../symbols/two-children-symbol/Alternation";
import { Concatenation } from "../symbols/two-children-symbol/Concatenation";

test("create ast", () => {
    const aLeaf = new Leaf("a");
    const anAST = new AST(aLeaf);
    expect(anAST.getRoot().equals(aLeaf)).toBe(true);
    //console.log(anAST.toString());
});

test("check simplify", () => {
    const anAlternation = Alternation.fromArray([
        Concatenation.fromArray([new Leaf("a"), new Leaf("c"), new Leaf("d")]),
        Concatenation.fromArray([new Leaf("a"), new Leaf("d"), new Leaf("d")]),
    ]);

    const simplifiedOperand = Concatenation.fromArray([
        new Leaf("a"),
        new Alternation(new Leaf("c"), new Leaf("d")),
        new Leaf("d"),
    ]);

    const anAST = new AST(anAlternation);
    const simplifiedAST = anAST.simplify();
    const answerAST = new AST(simplifiedOperand);

    // console.log(simplifiedAST.toString());
    // console.log(answerAST.toString());

    expect(simplifiedAST.equals(answerAST)).toBe(true);
});

test("check ebnf", () => {
    const anAlternation = Alternation.fromArray([
        Concatenation.fromArray([new Leaf("a"), new Leaf("c"), new Leaf("d")]),
        Concatenation.fromArray([new Leaf("a"), new Leaf("d")]),
        Concatenation.fromArray([new Leaf("a"), new Leaf("b"), new Leaf("d")]),
    ]);

    const anAST = new AST(anAlternation, "statement");
    //console.log(anAST.toEBNF());
    expect(anAST.toEBNF()).toBe('statement ::= "a"("c"|"b")?"d"');
});
