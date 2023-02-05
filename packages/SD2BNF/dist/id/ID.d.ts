/**
 * 唯一となる識別子を生成するクラス
 */
export declare class ID extends Object {
    private static idSet;
    /**
     * IDの文字列を取得する
     * @returns IDの文字列
     */
    static getID(): string;
    /**
     * 指定したidが使用されていた場合は解放し、getIDメソッドで再び取得可能にする
     * @param id 解放するID
     * @returns IDが存在して、解放できたならTrue、それ以外はFalse
     */
    static release(id: string): boolean;
}
//# sourceMappingURL=ID.d.ts.map