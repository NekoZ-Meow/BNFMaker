/**
 * 配列に関するユーティリティ
 */

export const ArrayUtility = {
    /**
     * 配列の合計を取得する
     * @param anArray 数値の配列
     * @returns 配列の合計値
     */
    sum: (anArray: Array<number>) => {
        return anArray.reduce((prev, current) => prev + current, 0);
    },
};
