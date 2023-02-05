import { Leaf } from "../symbols/leaf-symbol/Leaf";
import { Alternation } from "../symbols/two-children-symbol/Alternation";

test("check fromArray", () => {
    const anAlternation = Alternation.fromArray([
        new Leaf("a"),
        new Leaf("b"),
        new Leaf("c"),
        new Leaf("d"),
    ]);

    const answer = new Alternation(
        new Leaf("a"),
        new Alternation(new Leaf("b"), new Alternation(new Leaf("c"), new Leaf("d")))
    );

    expect(anAlternation instanceof Alternation).toBe(true);

    // console.log(anAlternation.toString());
    expect(anAlternation.equals(answer)).toBe(true);
});

test("check expand", () => {
    const answer = [new Leaf("a"), new Leaf("b"), new Leaf("c"), Leaf.Epsilon];
    const anAlternation = Alternation.fromArray(answer);
    expect(anAlternation instanceof Alternation).toBe(true);
    expect(
        (anAlternation as Alternation)
            .expand()
            .every((aSymbol, index) => aSymbol.equals(answer.at(index)))
    ).toBe(true);
});
