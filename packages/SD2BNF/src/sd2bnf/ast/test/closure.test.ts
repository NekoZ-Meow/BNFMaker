import { Leaf } from "../symbols/leaf-symbol/Leaf";
import { Closure } from "../symbols/one-child-symbol/closure/Closure";

test("check instantiation", () => {
    const aLeaf = new Leaf("a");
    const aClosure = new Closure(aLeaf);

    expect(aClosure.getChild().equals(aLeaf)).toBe(true);
});
