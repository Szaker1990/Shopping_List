const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const Html = require('html-webpack-plugin');
const Compression = require("compression-webpack-plugin");

module.exports = {
    entry: ["whatwg-fetch",`./src/app.js`],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `build`)
    },
    devServer: {
        contentBase: path.join(__dirname, `src`),
        publicPath: "/build/",
        compress: true,
        port: 3001,
        historyApiFallback: true
    },
    watch: true,
    mode: 'development',
    devtool: "source-map",
    plugins: [
        new Html({
            filename: "index.html",
            template: `./src/index.html`
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        new Compression({
            threshold: 0,
            minRatio: 0.5
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    //Uncomment for production \/
                    // MiniCSS.loader,
                    //Comment for production \/
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "/images/",
                    outputPath: "/images/"
                }
            },

        ]
    }
};

