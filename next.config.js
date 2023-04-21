const withImages = require("next-images");
const withOffline = require("next-offline");
const withSourceMaps = require("@zeit/next-source-maps");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

module.exports = withImages(
    withOffline(
        withSourceMaps({
            compiler: {
                styledComponents: true,
            },
        }),
    ),
);
