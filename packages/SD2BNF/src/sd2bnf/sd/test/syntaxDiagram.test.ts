import { SyntaxDiagram } from "../SyntaxDiagram";

test("to nfa and ebnf test", () => {
    const aDiagram = new SyntaxDiagram("Statement");
    const leafA = aDiagram.createLeaf("A");
    const leafB = aDiagram.createLeaf("B");
    const leafC = aDiagram.createLeaf("C");
    const leafD = aDiagram.createLeaf("D");

    leafA.setName("AAA");

    leafA.isStart = true;
    leafD.isEnd = true;
    leafA.connectTo(leafA);
    leafA.connectTo(leafB);
    leafB.connectTo(leafC);
    leafB.connectTo(leafD);
    leafC.connectTo(leafD);
    console.log(aDiagram.toString());

    const aNFA = aDiagram.toNFA();
    aNFA.prettyPrint();
    // A+ B C
    console.log(aNFA.toAST().toEBNF());
});
