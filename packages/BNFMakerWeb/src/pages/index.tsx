import Head from "next/head";
import React from "react";

import { DiagramEditor } from "../components/diagram-editor/DiagramEditor";
import { RowResizableBox } from "../components/resizable-box/RowResizableBox";
import { ResultView } from "../components/result-view/ResultView";
import { AppHeader } from "../components/toolbar/AppHeader";
import { ColumnFlexBox } from "../styles/flex-box/ColumnFlexBox";

const BNFMaker = React.memo(() => {
    return (
        <>
            <Head>
                <title>BNFMaker</title>
            </Head>
            <ColumnFlexBox>
                <AppHeader></AppHeader>
                <RowResizableBox>
                    <DiagramEditor></DiagramEditor>
                    <ResultView></ResultView>
                </RowResizableBox>
            </ColumnFlexBox>
        </>
    );
});

export default BNFMaker;
