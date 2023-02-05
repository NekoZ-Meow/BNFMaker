/**
 * ファイル入出力に関する処理をまとめたクラス
 */
export class FileIO extends Object {
    /**
     * ファイルをダウンロードする
     * @param aBlob ダウンロードするデータを表すBlob
     */
    public static async downloadFile(aBlob: Blob, fileName: string) {
        return new Promise<void>((resolve, reject) => {
            if (!document) reject("document is not exists.");
            const anElement = document.createElement("a");
            anElement.href = URL.createObjectURL(aBlob);
            anElement.download = fileName;
            anElement.click();
            anElement.remove();
            resolve();
        });
    }

    /**
     * ファイルを読み込み文字列にして返す
     * @param aBlob 文字列にするファイルを表すBlob
     */
    public static async loadFileAsText(aBlob: Blob) {
        const aReader = new FileReader();
        return new Promise<string>((resolve, reject) => {
            aReader.readAsText(aBlob);
            aReader.onload = () => {
                const result = aReader.result;
                if (typeof result === "string") {
                    resolve(result);
                }
                reject(`load failed: type '${typeof result}' not match string.`);
            };
            aReader.onerror = () => {
                reject(aReader.error);
            };
        });
    }
}
