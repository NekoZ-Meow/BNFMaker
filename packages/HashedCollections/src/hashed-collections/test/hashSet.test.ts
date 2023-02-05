import { Hashable } from "../Hashable";
import { HashSet } from "../HashSet";

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

test("check add", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const symbolC = new HashableItem("C", 0);
    const aSet = new HashSet<HashableItem>();

    aSet.addAll(symbolA, symbolB, symbolC);
    const anArray = aSet.toArray();
    expect(anArray.findIndex((element) => element.equals(symbolA))).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element.equals(symbolB))).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element.equals(symbolC))).toBeGreaterThanOrEqual(0);
});

test("check toArray when length is 0", () => {
    const aSet = new HashSet<HashableItem>();
    const anArray = aSet.toArray();
    expect(anArray.length).toBe(0);
});

test("check add same value", () => {
    const aSymbol = new HashableItem("A", 0);
    const sameSymbol = new HashableItem("A", 0);
    const aSet = new HashSet<HashableItem>();

    aSet.addAll(aSymbol, sameSymbol);
    expect(aSet.toArray().length).toBe(1);
});

test("check has", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const aSet = new HashSet<HashableItem>();

    aSet.add(symbolA);
    expect(aSet.has(symbolA)).toBe(true);
    expect(aSet.has(symbolB)).toBe(false);
});

test("check remove", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 0);
    const aSet = new HashSet<HashableItem>();
    aSet.addAll(symbolA, symbolB);

    expect(aSet.has(symbolA)).toBe(true);
    expect(aSet.delete(symbolA)).toBe(symbolA);
    expect(aSet.has(symbolA)).toBe(false);
    expect(aSet.has(symbolB)).toBe(true);
    expect(aSet.delete(symbolA)).toBeNull();
});

test("check size", () => {
    const aSet = new HashSet<HashableItem>();

    let count = 0;
    for (let charCode = "A".charCodeAt(0); charCode <= "Z".charCodeAt(0); charCode++) {
        const aSymbol = new HashableItem(String.fromCharCode(charCode), charCode);
        aSet.add(aSymbol);
        count += 1;
        expect(aSet.size()).toBe(count);
    }

    for (let charCode = "A".charCodeAt(0); charCode <= "Z".charCodeAt(0); charCode++) {
        const aSymbol = new HashableItem(String.fromCharCode(charCode), charCode);
        aSet.delete(aSymbol);
        count -= 1;
        expect(aSet.size()).toBe(count);
    }
});

test("check equals", () => {
    const aSet = new HashSet<HashableItem>();
    const anotherSet = new HashSet<HashableItem>();

    for (let charCode = "A".charCodeAt(0); charCode <= "F".charCodeAt(0); charCode += 1) {
        const aSymbol = new HashableItem(String.fromCharCode(charCode), charCode);
        aSet.add(aSymbol);
    }

    for (let charCode = "F".charCodeAt(0); charCode >= "A".charCodeAt(0); charCode -= 1) {
        const aSymbol = new HashableItem(String.fromCharCode(charCode), charCode);
        anotherSet.add(aSymbol);
    }

    expect(aSet.equals(null)).toBe(false);
    expect(aSet.equals(new HashableItem("A", "A".charCodeAt(0)))).toBe(false);
    expect(aSet.equals(anotherSet)).toBe(true);
    anotherSet.delete(new HashableItem("A", "A".charCodeAt(0)));
    expect(aSet.equals(anotherSet)).toBe(false);
    anotherSet.add(new HashableItem("G", "G".charCodeAt(0)));
    expect(aSet.equals(anotherSet)).toBe(false);

    //ハッシュ値が同じ
    expect(
        new HashSet<HashableItem>(new HashableItem("A", 0)).equals(
            new HashSet<HashableItem>(new HashableItem("B", 0))
        )
    ).toBe(false);
});

test("check values", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const symbolC = new HashableItem("C", 0);
    const aSet = new HashSet<HashableItem>();
    aSet.addAll(symbolA, symbolB, symbolC);
    const anArray = [...aSet.values()];
    expect(anArray.findIndex((element) => element.equals(symbolA))).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element.equals(symbolB))).toBeGreaterThanOrEqual(0);
    expect(anArray.findIndex((element) => element.equals(symbolC))).toBeGreaterThanOrEqual(0);
});

test("check entries", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const symbolC = new HashableItem("C", 0);
    const aSet = new HashSet<HashableItem>();
    aSet.addAll(symbolA, symbolB, symbolC);
    const anArray = [...aSet.entries()];
    expect(
        anArray.findIndex((element) => element.every((value) => value.equals(symbolA)))
    ).toBeGreaterThanOrEqual(0);
    expect(
        anArray.findIndex((element) => element.every((value) => value.equals(symbolB)))
    ).toBeGreaterThanOrEqual(0);
    expect(
        anArray.findIndex((element) => element.every((value) => value.equals(symbolC)))
    ).toBeGreaterThanOrEqual(0);
});

test("check clear", () => {
    const symbolA = new HashableItem("A", 0);
    const symbolB = new HashableItem("B", 1);
    const symbolC = new HashableItem("C", 0);
    const aSet = new HashSet<HashableItem>();
    aSet.addAll(symbolA, symbolB, symbolC);
    aSet.clear();

    expect(aSet.toArray()).toEqual([]);
    expect(aSet.size()).toBe(0);
});
