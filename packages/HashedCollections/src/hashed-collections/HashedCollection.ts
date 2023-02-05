import { Hashable } from "./Hashable";

export abstract class HashedCollection<K extends Hashable, V> extends Object {
    protected tally = 0; //追加されている要素の数

    constructor() {
        super();
    }

    public abstract add(anObject: unknown): void;
    public abstract addAll(...objects: Array<unknown>): void;
    public abstract clear(): void;
    public abstract delete(anObject: K): V | null;
    public abstract forEach(
        callbackfn: (value1: V, value2: K, self: HashedCollection<K, V>) => void
    ): void;
    public abstract has(anObject: K): boolean;
    public abstract size(): number;
    public abstract toArray(): Array<unknown>;
}
