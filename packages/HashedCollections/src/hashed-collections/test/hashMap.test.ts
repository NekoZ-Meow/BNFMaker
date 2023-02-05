import { Hashable } from "../Hashable";
import { HashMap } from "../HashMap";

class HashableItem extends Object implements Hashable {
    public name = "";
    public hashCode: number;

    constructor(name: string, hashCode: number) {
        super();
        this.name = name;
        this.hashCode = hashCode;
    }

    equals(_other: unknown): boolean {
        if (!(_other instanceof HashableItem)) return false;
        return this.hashCode === _other.hashCode && this.name === _other.name;
    }

    hash(): number {
        return this.hashCode;
    }
}

test("get values", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const symbolC = new HashableItem("C", 0);
    const aMap = new HashMap<HashableItem, number>();
    aMap.addAll([symbolA, 0], [symbolB, 1], [symbolC, 2]);

    const anArray = [...aMap.values()];
    expect(anArray.findIndex((element) => element === 0)).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element === 1)).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element === 2)).toBeGreaterThanOrEqual(0);
});

test("test forEach", () => {
    const symbols: Array<[HashableItem, number]> = [
        [new HashableItem("A", 0), 0],
        [new HashableItem("B", 0), 1],
    ];
    const aMap = new HashMap<HashableItem, number>(...symbols);

    aMap.forEach((value, key) => {
        const index = symbols.findIndex((symbol) => symbol[0].equals(key));
        expect(index !== -1).toBe(true);
        expect(symbols.at(index)?.[1]).toBe(value);
    });
});
