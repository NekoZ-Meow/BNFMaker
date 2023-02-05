import { Hashable } from "./Hashable";
import { HashedCollection } from "./HashedCollection";
/**
 * ハッシュ値を用いた(チェイン法の)集合の実装。順序は保証しない
 * HashMapを使用しています。
 */
export declare class HashSet<T extends Hashable> extends HashedCollection<T, T> implements Hashable {
    private aMap;
    /**
     * 集合を作成する
     */
    constructor(...objects: Array<T>);
    /**
     * 集合に追加する
     * @param anObject 追加するオブジェクト
     */
    add(anObject: T): HashSet<T>;
    /**
     * 集合に追加する
     * @param objects 追加するオブジェクト群
     */
    addAll(...objects: Array<T>): HashSet<T>;
    /**
     * 全ての要素を削除する
     */
    clear(): void;
    /**
     * 指定したオブジェクトを削除する
     * @param anObject 削除するオブジェクト
     * @returns 削除したエレメントもしくはnull
     */
    delete(anObject: T): T | null;
    /**
     * この辞書の反復可能オブジェクトを返す
     * @returns この辞書の反復可能オブジェクト
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * オブジェクトが同値かどうか
     * @param other 判定するオブジェクト
     * @returns 同じならtrue,それ以外はfalse
     */
    equals(other: unknown): boolean;
    /**
     * 受け取った関数をこのSetの全ての要素で1回ずつ実行する。順序は保証しない
     * @param callbackfn 要素を受け取る関数
     */
    forEach(callbackfn: (value: T, value2: T, self: HashSet<T>) => void): void;
    /**
     * 指定したオブジェクトが存在するか
     * @param anObject 検索するオブジェクト
     * @returns 存在するならtrue,それ以外はfalse
     */
    has(anObject: T): boolean;
    /**
     * この集合のハッシュ値を返す
     * @returns この集合のハッシュ値
     */
    hash(): number;
    /**
     * この辞書のキーが含まれている反復可能オブジェクトを返す
     * @returns この辞書のキーが含まれている反復可能オブジェクト
     */
    keys(): IterableIterator<T>;
    /**
     * この集合の大きさをO(1)で返す
     * @returns この集合の大きさ
     */
    size(): number;
    /**
     * この辞書の要素が含まれている反復可能オブジェクトを返す
     * @returns この辞書の要素が含まれている反復可能オブジェクト
     */
    values(): IterableIterator<T>;
    /**
     * 集合をリストへ変換する
     * @returns 集合のリスト
     */
    toArray(): Array<T>;
    /**
     * このオブジェクトを文字列へ変換する
     */
    toString(): string;
}
//# sourceMappingURL=HashSet.d.ts.map