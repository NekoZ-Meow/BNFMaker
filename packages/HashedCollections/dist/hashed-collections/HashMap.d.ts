import { Hashable } from './Hashable';
import { HashedCollection } from './HashedCollection';
/**
 * ハッシュ値を用いた(チェイン法の)辞書の実装。順序は保証しない
 * jsの辞書を用いて誤魔化しています
 */
export declare class HashMap<K extends Hashable, V> extends HashedCollection<K, V> implements Hashable {
    private aMap;
    /**
     * 辞書を作成する
     */
    constructor(...items: Array<[K, V]>);
    /**
     * 辞書にキーと要素のペアを追加する
     * @param item 追加するキーと要素のペア
     * @return この辞書
     */
    add(item: [K, V]): HashMap<K, V>;
    /**
     * 辞書にまとめて追加する
     * @param items 追加するキーと要素のペア群
     * @return この辞書
     */
    addAll(...items: Array<[K, V]>): HashMap<K, V>;
    /**
     * 要素を削除する
     */
    clear(): void;
    /**
     * 受け取った関数をこのMapの全てのキーと要素のペアで1回ずつ実行する。順序は保証しない
     * @param callbackfn キーと要素のペアを受け取る関数
     */
    forEach(callbackfn: (value: V, key: K, self: HashMap<K, V>) => void): void;
    /**
     * この辞書の反復可能オブジェクトを返す
     * @returns この辞書の反復可能オブジェクト
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * オブジェクトが同値かどうか。O(N^2)なので注意
     * @param other 判定するオブジェクト
     * @returns 同じならtrue,それ以外はfalse
     */
    equals(other: unknown): boolean;
    /**
     * 指定したキーとその射像となる要素を削除する
     * @param key 削除するキー
     * @returns 削除した要素。存在しない場合はnull
     */
    delete(key: K): V | null;
    /**
     * 指定したキーに対応する要素を取得する
     * 存在しないならnull
     * @param key キー
     */
    get(key: K): V | null;
    /**
     * 指定したキーが存在するか
     * @param key 検索するキー
     * @returns 存在するならtrue,それ以外はfalse
     */
    has(key: K): boolean;
    /**
     * この辞書のハッシュ値を返す
     * @returns この辞書のハッシュ値
     */
    hash(): number;
    /**
     * この辞書のキーが含まれている反復可能オブジェクトを返す
     * @returns この辞書のキーが含まれている反復可能オブジェクト
     */
    keys(): IterableIterator<K>;
    /**
     * このオブジェクトの反復可能オブジェクトを作成する
     * @param filter 反復可能オブジェクトに含める要素を選択する関数
     * @return 反復可能オブジェクト
     */
    private makeIterator;
    /**
     * 指定したキーからキーとバリューのペアを取得する
     * @param key 検索に使用するキー
     * @returns 存在するならオブジェクトが入っているDictionaryItem,それ以外はnull
     */
    private search;
    /**
     * この辞書にキーとその要素を追加する
     * @param key キー
     * @param value 要素
     * @return この辞書
     */
    set(key: K, value: V): HashMap<K, V>;
    /**
     * 与えられたキーに対して要素が存在しないならば要素を追加する。
     * すでにキーに対応した要素が存在するならば追加しない
     * @param key 追加するキー
     * @param value 追加する要素
     * @returns 追加したならばその要素、それ以外はnull
     */
    setDefault(key: K, value: V): V | null;
    /**
     * この辞書の大きさをO(1)で返す
     * @returns この辞書の大きさ
     */
    size(): number;
    /**
     * この辞書の要素が含まれている反復可能オブジェクトを返す
     * @returns この辞書の要素が含まれている反復可能オブジェクト
     */
    values(): IterableIterator<V>;
    /**
     * 辞書をリストへ変換する
     * @returns 辞書のリスト
     */
    toArray(): Array<[K, V]>;
    /**
     * このオブジェクトを文字列へ変換する
     */
    toString(): string;
}
//# sourceMappingURL=HashMap.d.ts.map