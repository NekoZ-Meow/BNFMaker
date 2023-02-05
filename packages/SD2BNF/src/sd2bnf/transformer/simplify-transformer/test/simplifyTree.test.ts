import { Leaf } from "../../../ast/symbols/leaf-symbol/Leaf";
import { OneOrMore } from "../../../ast/symbols/one-child-symbol/closure/OneOrMore";
import { ZeroOrMore } from "../../../ast/symbols/one-child-symbol/closure/ZeroOrMore";
import { ZeroOrOne } from "../../../ast/symbols/one-child-symbol/closure/ZeroOrOne";
import { Alternation } from "../../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../../ast/symbols/two-children-symbol/Concatenation";
import { SimplifyTree } from "../simplify-alternation/SimplifyTree";

test("check simplify simple concatenation", () => {
    const anAlternation = Alternation.fromArray([
        Concatenation.fromArray([new Leaf("a"), new Leaf("b"), new Leaf("d")]),
        //Concatenation.fromArray([new Leaf("a"), new Leaf("b")]),
        Concatenation.fromArray([new Leaf("a"), new Leaf("c"), new Leaf("d")]),
    ]);
    if (!(anAlternation instanceof Alternation)) {
        throw Error("正しくシンボルが生成されませんでした");
    }
    // simplify prefix
    let answer = Concatenation.fromArray([
        new Leaf("a"),
        new Alternation(
            new Concatenation(new Leaf("b"), new Leaf("d")),
            new Concatenation(new Leaf("c"), new Leaf("d"))
        ),
    ]);
    let simplifyTree = new SimplifyTree(anAlternation);
    simplifyTree.prettyPrint();
    console.log(simplifyTree.simplify().toString());
    expect(simplifyTree.simplify().equals(answer)).toBe(true);

    // simplify suffix
    answer = Concatenation.fromArray([
        new Alternation(
            new Concatenation(new Leaf("a"), new Leaf("b")),
            new Concatenation(new Leaf("a"), new Leaf("c"))
        ),
        new Leaf("d"),
    ]);

    simplifyTree = new SimplifyTree(anAlternation, true);
    console.log(simplifyTree.simplify().toString());
    expect(simplifyTree.simplify().equals(answer)).toBe(true);
});

test("check simplify include closures", () => {
    const anAlternation = Alternation.fromArray([
        Concatenation.fromArray([
            new ZeroOrMore(new Leaf("a")),
            new Leaf("b"),
            new ZeroOrMore(new Leaf("d")),
        ]),
        //Concatenation.fromArray([new Leaf("a"), new Leaf("b")]),
        Concatenation.fromArray([
            new ZeroOrMore(new Leaf("a")),
            new Leaf("c"),
            new OneOrMore(new Leaf("d")),
        ]),
    ]);
    if (!(anAlternation instanceof Alternation)) {
        throw Error("正しくシンボルが生成されませんでした");
    }
    // simplify prefix
    let answer = Concatenation.fromArray([
        new ZeroOrMore(new Leaf("a")),
        new Alternation(
            new Concatenation(new Leaf("b"), new ZeroOrOne(new Leaf("d"))),
            new Concatenation(new Leaf("c"), new OneOrMore(new Leaf("d")))
        ),
    ]);
    let simplifyTree = new SimplifyTree(anAlternation);
    simplifyTree.prettyPrint();
    console.log(simplifyTree.simplify().toString());

    //expect(simplifyTree.simplify().equals(answer)).toBe(true);

    // simplify suffix
    answer = Concatenation.fromArray([
        new Alternation(
            new Concatenation(new ZeroOrMore(new Leaf("a")), new Leaf("b")),
            Concatenation.fromArray([new ZeroOrMore(new Leaf("a")), new Leaf("c"), new Leaf("d")])
        ),
        new ZeroOrMore(new Leaf("d")),
    ]);

    simplifyTree = new SimplifyTree(anAlternation, true);
    simplifyTree.prettyPrint();
    console.log(simplifyTree.simplify().toString());
    expect(simplifyTree.simplify().equals(answer)).toBe(true);
});
