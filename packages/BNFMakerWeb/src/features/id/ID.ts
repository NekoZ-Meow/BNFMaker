/**
 * 唯一となる識別子を生成するクラス
 */
export class ID extends Object {
    private static idSet = new Set<string>();

    /**
     * IDの文字列を取得する
     * @returns IDの文字列
     */
    static getID(): string {
        while (true) {
            const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
            if (!ID.idSet.has(id)) {
                ID.idSet.add(id);
                return id;
            }
        }
    }

    /**
     * 指定したidが使用されていた場合は解放し、getIDメソッドで再び取得可能にする
     * @param id 解放するID
     * @returns IDが存在して、解放できたならTrue、それ以外はFalse
     */
    static release(id: string): boolean {
        return ID.idSet.delete(id);
    }
}
