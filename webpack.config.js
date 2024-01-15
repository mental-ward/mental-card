const path = require("path")
module.exports = {
    mode: "production",
    entry : {
        index : "./src/index.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename : '[name]_bundle.js'
    },
    target: ["electron-renderer"]
}