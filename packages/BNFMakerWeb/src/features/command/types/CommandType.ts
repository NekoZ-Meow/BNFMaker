/**
 * 経歴を保存するためのコマンドの型
 */
export type CommandType<T> = {
    execute: () => T;
    undo: () => void;
};
