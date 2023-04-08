/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withReactSvg = require("next-react-svg");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const withSourceMaps = require("@zeit/next-source-maps");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

module.exports = withImages(
    withSass(
        withReactSvg(
            withOffline(
                withSourceMaps(
                    nextEnv(
                        withBundleAnalyzer({
                            images: {
                                domains: [""],
                            },
                            serverRuntimeConfig: {
                                mySecret: "secret",
                                secondSecret: process.env.SECOND_SECRET,
                            },
                            publicRuntimeConfig: {
                                staticFolder: "/public",
                            },
                            webpack(config) {
                                return config;
                            },
                        }),
                    ),
                ),
            ),
        ),
    ),
);
