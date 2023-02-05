import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import GlobalStyle from "../styles/GlobalStyle";

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyle></GlobalStyle>
        <RecoilRoot>
            <Component {...pageProps}></Component>
        </RecoilRoot>
    </>
);

export default App;
