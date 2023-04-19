const withImages = require("next-images");
const withReactSvg = require("next-react-svg");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const withSourceMaps = require("@zeit/next-source-maps");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

module.exports = withImages(
    withReactSvg({
        include: /public/,
        webpack(config, options) {
            config.module.rules.push({
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts)x?$/,
                },
                use: ["@svgr/webpack"],
            });

            return config;
        },
    }),
    withOffline(
        withBundleAnalyzer(
            withSourceMaps({
                poweredByHeader: false,
                env: {
                    PUBLIC_URL: process.env.PUBLIC_URL,
                },
                compiler: {
                    styledComponents: true,
                },
            }),
        ),
    ),
);
