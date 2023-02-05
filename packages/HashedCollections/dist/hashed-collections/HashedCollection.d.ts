import { Hashable } from "./Hashable";
export declare abstract class HashedCollection<K extends Hashable, V> extends Object {
    protected tally: number;
    constructor();
    abstract add(anObject: unknown): void;
    abstract addAll(...objects: Array<unknown>): void;
    abstract clear(): void;
    abstract delete(anObject: K): V | null;
    abstract forEach(callbackfn: (value1: V, value2: K, self: HashedCollection<K, V>) => void): void;
    abstract has(anObject: K): boolean;
    abstract size(): number;
    abstract toArray(): Array<unknown>;
}
//# sourceMappingURL=HashedCollection.d.ts.map