import { AST } from "../../ast/AST";
import { Leaf } from "../../ast/symbols/leaf-symbol/Leaf";
import { Closure } from "../../ast/symbols/one-child-symbol/closure/Closure";
import { Alternation } from "../../ast/symbols/two-children-symbol/Alternation";
import { Concatenation } from "../../ast/symbols/two-children-symbol/Concatenation";
import { NFA } from "../NFA";
import { State } from "../State";

test("create ast", () => {
    const aGNFA = new NFA();
    const node0 = new State("a");
    const node1 = new State("b");
    const node2 = new State("c");
    aGNFA.addStart(node0);
    aGNFA.addEnd(node1);

    node0.transitionTo(node0, new Leaf("0"));
    node0.transitionTo(node1, new Leaf("0"));
    node0.transitionTo(node1, new Leaf("1"));
    node0.transitionTo(node2, new Leaf("0"));
    node2.transitionTo(node1, new Leaf(""));

    const anAST = new AST(
        new Alternation(
            new Concatenation(new Closure(new Leaf("0")), new Leaf("0")),
            new Concatenation(new Closure(new Leaf("0")), new Leaf("1"))
        )
    );

    aGNFA.prettyPrint();
    console.log(aGNFA.toAST().toString());
    expect(anAST.equals(aGNFA.toAST())).toBe(true);
});

test("to EBNF", () => {
    const aGNFA = new NFA();
    const node0 = new State();
    const node1 = new State();
    const node2 = new State();
    aGNFA.addStart(node0);
    aGNFA.addEnd(node1);

    aGNFA.addEnd(node2);

    node0.transitionTo(node1, new Leaf("0"));
    node0.transitionTo(node2, new Leaf("1"));

    node1.transitionTo(node0, new Leaf("0"));
    node1.transitionTo(node1, new Leaf("1"));

    node2.transitionTo(node0, new Leaf("1"));
    node2.transitionTo(node1, new Leaf("0"));

    console.log(aGNFA.toAST().toEBNF());
});
