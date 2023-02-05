const isProd = process.env.NODE_ENV === "production";

module.exports = {
    assetPrefix: isProd ? "https://nekoz-meow.github.io/BNFMaker/" : "/",
};
