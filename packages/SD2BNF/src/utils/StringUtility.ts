/**
 * 文字列に関するユーティリティ
 */

export class StringUtility extends Object {
    /**
     * 文字列をハッシュ値に変換する
     * @param aString ハッシュ値にする文字列
     * @returns ハッシュ値
     */
    public static stringToHash(aString: string): number {
        let hash = 0;
        for (const aChar of aString) {
            hash = hash * 31 + aChar.charCodeAt(0);
            hash = (hash | 0) % Number.MAX_SAFE_INTEGER;
        }
        return hash;
    }
}
