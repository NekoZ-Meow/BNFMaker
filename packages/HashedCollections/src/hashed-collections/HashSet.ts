import { Hashable } from "./Hashable";
import { HashedCollection } from "./HashedCollection";
import { HashMap } from "./HashMap";

/**
 * ハッシュ値を用いた(チェイン法の)集合の実装。順序は保証しない
 * HashMapを使用しています。
 */
export class HashSet<T extends Hashable> extends HashedCollection<T, T> implements Hashable {
    private aMap: HashMap<T, T>;

    /**
     * 集合を作成する
     */
    constructor(...objects: Array<T>) {
        super();
        this.aMap = new HashMap();

        this.addAll(...objects);
    }

    /**
     * 集合に追加する
     * @param anObject 追加するオブジェクト
     */
    public add(anObject: T): HashSet<T> {
        if (!this.has(anObject)) {
            this.aMap.set(anObject, anObject);
        }

        return this;
    }

    /**
     * 集合に追加する
     * @param objects 追加するオブジェクト群
     */
    public addAll(...objects: Array<T>): HashSet<T> {
        objects.forEach((anObject) => {
            this.add(anObject);
        });

        return this;
    }

    /**
     * 全ての要素を削除する
     */
    public clear(): void {
        this.aMap.clear();
    }

    /**
     * 指定したオブジェクトを削除する
     * @param anObject 削除するオブジェクト
     * @returns 削除したエレメントもしくはnull
     */
    public delete(anObject: T): T | null {
        return this.aMap.delete(anObject);
    }

    /**
     * この辞書の反復可能オブジェクトを返す
     * @returns この辞書の反復可能オブジェクト
     */
    public entries(): IterableIterator<[T, T]> {
        return this.aMap.entries();
    }

    /**
     * オブジェクトが同値かどうか
     * @param other 判定するオブジェクト
     * @returns 同じならtrue,それ以外はfalse
     */
    public equals(other: unknown) {
        if (other === null || other === undefined) return false;
        if (!(other instanceof HashSet)) return false;
        if (this.size() !== other.size()) return false;
        if (other.hash() !== this.hash()) return false;
        for (const anObject of this.values()) {
            if (!other.has(anObject)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 受け取った関数をこのSetの全ての要素で1回ずつ実行する。順序は保証しない
     * @param callbackfn 要素を受け取る関数
     */
    public forEach(callbackfn: (value: T, value2: T, self: HashSet<T>) => void) {
        const anIterator = this.entries();
        let aProperty = anIterator.next();
        while (aProperty.done !== undefined && !aProperty.done) {
            const [value, value2] = aProperty.value;
            callbackfn(value, value2, this);
            aProperty = anIterator.next();
        }
    }

    /**
     * 指定したオブジェクトが存在するか
     * @param anObject 検索するオブジェクト
     * @returns 存在するならtrue,それ以外はfalse
     */
    public has(anObject: T): boolean {
        return this.aMap.has(anObject);
    }

    /**
     * この集合のハッシュ値を返す
     * @returns この集合のハッシュ値
     */
    public hash(): number {
        return this.aMap.hash();
    }

    /**
     * この辞書のキーが含まれている反復可能オブジェクトを返す
     * @returns この辞書のキーが含まれている反復可能オブジェクト
     */
    public keys(): IterableIterator<T> {
        return this.aMap.keys();
    }

    /**
     * この集合の大きさをO(1)で返す
     * @returns この集合の大きさ
     */
    public size(): number {
        return this.aMap.size();
    }

    /**
     * この辞書の要素が含まれている反復可能オブジェクトを返す
     * @returns この辞書の要素が含まれている反復可能オブジェクト
     */
    public values(): IterableIterator<T> {
        return this.keys();
    }

    /**
     * 集合をリストへ変換する
     * @returns 集合のリスト
     */
    public toArray(): Array<T> {
        return this.aMap.toArray().map((item) => item[0]);
    }

    /**
     * このオブジェクトを文字列へ変換する
     */
    public toString(): string {
        const itemString = this.toArray()
            .map((value) => String(value))
            .join(", ");
        return `HashSet(${this.size()}) { ${itemString} }`;
    }
}
