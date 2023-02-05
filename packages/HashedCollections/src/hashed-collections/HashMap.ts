import { Item, List } from 'linked-list';

import { Hashable } from './Hashable';
import { HashedCollection } from './HashedCollection';

/**
 * HashMapで使用するLinkedListの要素を表すクラス
 */
class DictionaryItem<K extends Hashable, V> extends Item {
    private key: K;
    private value: V;

    /**
     * LinkedListの要素を生成する
     * @param key キー
     * @param value キーから参照される要素
     */
    constructor(key: K, value: V) {
        super();
        this.key = key;
        this.value = value;
    }

    /**
     * キーを取得する
     */
    public getKey(): K {
        return this.key;
    }

    /**
     * 要素を取得する
     */
    public getValue(): V {
        return this.value;
    }

    /**
     * キーと要素を取得する
     * @returns キーと要素
     */
    public getItem(): [K, V] {
        return [this.key, this.value];
    }
}

/**
 * ハッシュ値を用いた(チェイン法の)辞書の実装。順序は保証しない
 * jsの辞書を用いて誤魔化しています
 */
export class HashMap<K extends Hashable, V> extends HashedCollection<K, V> implements Hashable {
    private aMap: Map<number, List<DictionaryItem<K, V>>>;

    /**
     * 辞書を作成する
     */
    constructor(...items: Array<[K, V]>) {
        super();
        this.aMap = new Map();

        this.addAll(...items);
    }

    /**
     * 辞書にキーと要素のペアを追加する
     * @param item 追加するキーと要素のペア
     * @return この辞書
     */
    public add(item: [K, V]): HashMap<K, V> {
        const [key, value] = item;
        const hashCode = key.hash();
        if (this.aMap.has(hashCode)) {
            this.aMap.get(hashCode)?.append(new DictionaryItem(key, value));
        } else {
            this.aMap.set(hashCode, new List(new DictionaryItem(key, value)));
        }
        this.tally += 1;

        return this;
    }

    /**
     * 辞書にまとめて追加する
     * @param items 追加するキーと要素のペア群
     * @return この辞書
     */
    public addAll(...items: Array<[K, V]>): HashMap<K, V> {
        items.forEach((item) => {
            this.add(item);
        });

        return this;
    }

    /**
     * 要素を削除する
     */
    public clear(): void {
        this.aMap.clear();
        this.tally = 0;
    }

    /**
     * 受け取った関数をこのMapの全てのキーと要素のペアで1回ずつ実行する。順序は保証しない
     * @param callbackfn キーと要素のペアを受け取る関数
     */
    public forEach(callbackfn: (value: V, key: K, self: HashMap<K, V>) => void) {
        const anIterator = this.entries();
        let aProperty = anIterator.next();
        while (aProperty.done !== undefined && !aProperty.done) {
            const [key, value] = aProperty.value;
            callbackfn(value, key, this);
            aProperty = anIterator.next();
        }
    }

    /**
     * この辞書の反復可能オブジェクトを返す
     * @returns この辞書の反復可能オブジェクト
     */
    public entries(): IterableIterator<[K, V]> {
        return this.makeIterator<[K, V]>((key, value) => [key, value]);
    }

    /**
     * オブジェクトが同値かどうか。O(N^2)なので注意
     * @param other 判定するオブジェクト
     * @returns 同じならtrue,それ以外はfalse
     */
    public equals(other: unknown): boolean {
        if (other === null || other === undefined) return false;
        if (!(other instanceof HashMap)) return false;
        if (this.size() !== other.size()) return false;
        if (other.hash() !== this.hash()) return false;
        for (const [key, value] of this.entries()) {
            const targetValue = other.get(key);
            if (targetValue === null) return false;
            // 比較対象がHashableかどうか
            if ((value as unknown as Hashable).equals !== undefined) {
                if ((value as unknown as Hashable).equals(targetValue) === false) return false;
            } else {
                if (value !== targetValue) return false;
            }
        }

        return true;
    }

    /**
     * 指定したキーとその射像となる要素を削除する
     * @param key 削除するキー
     * @returns 削除した要素。存在しない場合はnull
     */
    public delete(key: K): V | null {
        const aDictionaryItem = this.search(key);
        if (aDictionaryItem != null) {
            const aList = aDictionaryItem.list;
            aDictionaryItem.detach();
            this.tally -= 1;
            if (aList.size === 0) {
                this.aMap.delete(key.hash());
            }
            return aDictionaryItem.getValue();
        }
        return null;
    }

    /**
     * 指定したキーに対応する要素を取得する
     * 存在しないならnull
     * @param key キー
     */
    public get(key: K): V | null {
        const item = this.search(key);
        return item !== null ? item.getValue() : null;
    }

    /**
     * 指定したキーが存在するか
     * @param key 検索するキー
     * @returns 存在するならtrue,それ以外はfalse
     */
    public has(key: K): boolean {
        return this.search(key) !== null;
    }

    /**
     * この辞書のハッシュ値を返す
     * @returns この辞書のハッシュ値
     */
    public hash(): number {
        if (this.tally === 0) {
            return 0;
        }
        return Array.from(this.aMap.keys()).reduce(
            (previousNumber, currentNumber) =>
                (previousNumber + currentNumber) % Number.MAX_SAFE_INTEGER
        );
    }

    /**
     * この辞書のキーが含まれている反復可能オブジェクトを返す
     * @returns この辞書のキーが含まれている反復可能オブジェクト
     */
    public keys(): IterableIterator<K> {
        return this.makeIterator<K>((key) => key);
    }

    /**
     * このオブジェクトの反復可能オブジェクトを作成する
     * @param filter 反復可能オブジェクトに含める要素を選択する関数
     * @return 反復可能オブジェクト
     */
    private makeIterator<T>(filter: (key: K, value: V) => T): IterableIterator<T> {
        const anIterator = this.aMap.values();
        return (function* () {
            let aProperty = anIterator.next();
            while (aProperty.done !== undefined && !aProperty.done) {
                let anItem = aProperty.value.head;
                while (anItem !== null) {
                    const [key, value] = anItem.getItem();
                    yield filter(key, value);
                    anItem = anItem.next;
                }
                aProperty = anIterator.next();
            }
        })();
    }

    /**
     * 指定したキーからキーとバリューのペアを取得する
     * @param key 検索に使用するキー
     * @returns 存在するならオブジェクトが入っているDictionaryItem,それ以外はnull
     */
    private search(key: K): DictionaryItem<K, V> | null {
        const hashCode = key.hash();
        if (this.aMap.has(hashCode)) {
            let element = this.aMap.get(hashCode)?.head;
            while (element) {
                // 存在したならば
                const targetKey = element.getKey();
                if (key.equals(targetKey)) {
                    return element;
                }
                element = element.next;
            }
        }
        return null;
    }

    /**
     * この辞書にキーとその要素を追加する
     * @param key キー
     * @param value 要素
     * @return この辞書
     */
    public set(key: K, value: V): HashMap<K, V> {
        return this.add([key, value]);
    }

    /**
     * 与えられたキーに対して要素が存在しないならば要素を追加する。
     * すでにキーに対応した要素が存在するならば追加しない
     * @param key 追加するキー
     * @param value 追加する要素
     * @returns 追加したならばその要素、それ以外はnull
     */
    public setDefault(key: K, value: V): V | null {
        if (this.has(key)) {
            return null;
        }
        this.set(key, value);
        return value;
    }

    /**
     * この辞書の大きさをO(1)で返す
     * @returns この辞書の大きさ
     */
    public size(): number {
        return this.tally;
    }

    /**
     * この辞書の要素が含まれている反復可能オブジェクトを返す
     * @returns この辞書の要素が含まれている反復可能オブジェクト
     */
    public values(): IterableIterator<V> {
        return this.makeIterator<V>((_, value) => value);
    }

    /**
     * 辞書をリストへ変換する
     * @returns 辞書のリスト
     */
    public toArray(): Array<[K, V]> {
        const anArray = new Array<[K, V]>();
        if (this.tally === 0) anArray;

        // 速度向上のためmapを用いた書き方は廃止
        Array.from(this.aMap.values()).forEach((aLinkedList) => {
            let item = aLinkedList.head;
            while (item) {
                anArray.push(item.getItem());
                item = item.next;
            }
        });
        return anArray;
    }

    /**
     * このオブジェクトを文字列へ変換する
     */
    public toString(): string {
        const itemString = this.toArray()
            .map(([key, value]) => `${String(key)} => ${String(value)}`)
            .join(", ");
        return `HashMap(${this.size()}) { ${itemString} }`;
    }
}
