// import { AST } from "../../../ast/AST";
// import { Alternation } from "../../../ast/symbols/Alternation";
// import { Closure } from "../../../ast/symbols/Closure";
// import { OneOrMore } from "../../../ast/symbols/closure/OneOrMore";
// import { Concatenation } from "../../../ast/symbols/Concatenation";
// import { Leaf } from "../../../ast/symbols/Leaf";

// test("check closure", () => {
//     const aSymbol = new Alternation(
//         new Concatenation(new Closure(new Leaf("a")), new Leaf("a")),
//         new Concatenation(
//             new Closure(new Leaf("a")),
//             new Concatenation(
//                 new Leaf("a"),
//                 new Concatenation(new Closure(new Leaf("a")), new Leaf("a"))
//             )
//         )
//     );

//     const anAST = new AST(aSymbol);
//     const simplify = anAST.simplify();
//     expect(simplify.getRoot().equals(new OneOrMore(new Leaf("a")))).toBe(true);
// });
