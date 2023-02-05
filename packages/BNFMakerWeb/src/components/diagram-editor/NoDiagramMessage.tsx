/**
 * 図が存在しない時に表示するメッセージ
 */

import React from "react";

import { CenterDiv } from "../../styles/Alignment";

/**
 * 図が存在しない時に表示するメッセージを表すコンポーネント
 */
export const NoDiagramMessage = React.memo(() => {
    return (
        <div style={{ height: "100%" }}>
            <CenterDiv>
                <div style={{ display: "block", textAlign: "center" }}>
                    <span>
                        <p>No syntax diagram.</p>
                    </span>
                    <span>
                        <p>Press the below '+' button to create a syntax diagram.</p>
                    </span>
                </div>
            </CenterDiv>
        </div>
    );
});
