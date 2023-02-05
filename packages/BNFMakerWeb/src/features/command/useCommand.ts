/**
 * コマンドを使用する
 */

import { useCallback } from "react";

import { CommandType } from "./types/CommandType";

const history = new Array<CommandType<unknown>>(); //経歴を保持するための配列
const redoHistory = new Array<CommandType<unknown>>(); //Undoの経歴を保持するための配列

/**
 * 経歴を保持して実行するための関数を使用する
 * @param aCommand 実行する関数
 * @returns 経歴を保持して実行するための関数
 */
export const useCommandDo = <T>() => {
    return useCallback(async (aCommand: CommandType<T>) => {
        const result = await aCommand.execute();
        history.push(aCommand);
        redoHistory.length = 0;
        return result;
    }, []);
};

/**
 * コマンドをUndoするため関数を使用する
 * @returns コマンドをUndoするため関数
 */
export const useUndo = () => {
    const undoDispatch = useCallback(() => {
        const aCommand = history.pop();
        if (aCommand === undefined) return;
        aCommand.undo();
        redoHistory.push(aCommand);
    }, []);
    return undoDispatch;
};

/**
 * コマンドをRedoするため関数を使用する
 * @returns コマンドをRedoするため関数
 */
export const useRedo = () => {
    const redoDispatch = useCallback(() => {
        const aCommand = redoHistory.pop();
        if (aCommand === undefined) return;
        aCommand.execute();
        history.push(aCommand);
    }, []);
    return redoDispatch;
};
