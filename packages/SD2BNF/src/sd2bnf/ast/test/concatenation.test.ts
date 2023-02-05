import { Leaf } from "../symbols/leaf-symbol/Leaf";
import { Concatenation } from "../symbols/two-children-symbol/Concatenation";

test("check fromArray", () => {
    const anConcatenation = Concatenation.fromArray([new Leaf("a"), new Leaf("b"), new Leaf("c")]);
    const answer = new Concatenation(
        new Leaf("a"),
        new Concatenation(new Leaf("b"), new Leaf("c"))
    );

    expect(anConcatenation.equals(answer)).toBe(true);
});

test("check expand", () => {
    const anConcatenation = Concatenation.fromArray([new Leaf("a"), Leaf.Epsilon, new Leaf("c")]);
    const answer = [new Leaf("a"), new Leaf("c")];

    expect(anConcatenation instanceof Concatenation).toBe(true);
    expect(
        (anConcatenation as Concatenation)
            .expand()
            .every((aSymbol, index) => aSymbol.equals(answer.at(index)))
    ).toBe(true);
});
