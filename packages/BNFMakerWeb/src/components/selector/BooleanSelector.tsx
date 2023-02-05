/**
 * ブール値を用いてコンポーネントを選択するためのコンポーネント
 */

import React from "react";

/**
 * 引数
 */
type Props = {
    value: boolean;
    onTrue: React.ReactElement;
    onFalse: React.ReactElement;
};

/**
 * ブール値を用いてコンポーネントを選択するためのコンポーネント
 */
export const BooleanSelector = React.memo<Props>(({ value, onTrue, onFalse }) => {
    return value ? onTrue : onFalse;
});
