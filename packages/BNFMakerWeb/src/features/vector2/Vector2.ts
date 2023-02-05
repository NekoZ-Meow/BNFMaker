/**
 * 2次元ベクトルを表現するクラス
 */
export class Vector2 extends Object {
    private _x = 0;
    private _y = 0;

    /**
     * 2次元ベクトルを作成する
     * @param x ベクトルのx成分
     * @param y ベクトルのy成分
     */
    constructor(x = 0, y = 0) {
        super();
        this._x = x;
        this._y = y;
    }

    /**
     * x成分
     */
    get x() {
        return this._x;
    }

    /**
     * y成分
     */
    get y() {
        return this._y;
    }

    /**
     * このベクトルと引数のベクトルを足し合わせた新しいベクトルを作成する
     * @param aVector2 加算するベクトル
     */
    public add(aVector2: Vector2) {
        return new Vector2(this.x + aVector2.x, this.y + aVector2.y);
    }

    /**
     * このベクトルの複製を返す
     * @returns このベクトルの複製
     */
    public copy() {
        return new Vector2(this.x, this.y);
    }

    /**
     * このベクトルを指定した数値で割ったものを返す
     */
    public div(aValue: number | Vector2) {
        if (typeof aValue === "number") {
            return new Vector2(this.x / aValue, this.y / aValue);
        }
        return new Vector2(this.x / aValue.x, this.y / aValue.y);
    }

    /**
     * 値が同値かを比較する
     * @param aValue 比較する値
     * @returns 同値ならtrue、それ以外はfalse
     */
    public equals(aValue: unknown): boolean {
        if (aValue === null || aValue === undefined) return false;
        if (!(aValue instanceof Vector2)) return false;
        return this.x === aValue.x && this.y === aValue.y;
    }

    /**
     * JSON形式で保存されたVector2オブジェクトからベクトルを作成する
     * @param vector2Object JSON形式で保存されたVector2オブジェクト
     * @returns 変換したベクトル
     */
    public static fromJson(vector2Object: { x: number; y: number }) {
        return new Vector2(vector2Object.x, vector2Object.y);
    }

    /**
     * このベクトルから引数のベクトルを引いた新しいベクトルを作成する
     * @param aVector2 減算するベクトル
     */
    public sub(aVector2: Vector2) {
        return new Vector2(this.x - aVector2.x, this.y - aVector2.y);
    }

    /**
     * このベクトルを指定した数値で掛けたものを返す
     */
    public mul(aValue: number | Vector2) {
        if (typeof aValue === "number") {
            return new Vector2(this.x * aValue, this.y * aValue);
        }
        return new Vector2(this.x * aValue.x, this.y * aValue.y);
    }

    /**
     * このオブジェクトをJSONに変換する際にきれいなオブジェクトにして返す。
     */
    public toJSON() {
        return { x: this.x, y: this.y };
    }
}
