const NodeTemplatePlugin = require("webpack/lib/node/NodeTemplatePlugin");

module.exports = {
    plugins: [new NodeTemplatePlugin()],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
