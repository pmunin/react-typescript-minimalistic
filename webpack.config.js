/**
 * @typedef {import('webpack').Configuration} WebPackConfiguration
 */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const path = require('path');
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));



/**
 * 
 * @param {*} env 
 * @returns {WebPackConfiguration}
 */
module.exports = function (env) {
    return {
        entry: {
            index: "./src/index.js"
        },
        output:{ // to make CleanWebpackPlugin work
            path: path.resolve("dist")
        },
        mode: env&&env.mode || (isDevServer?'development':'production'),
        devtool: isDevServer? 'inline-source-map' : undefined,
        module: {
            rules: [{
                    test: /\.(tsx?)|(jsx?)$/,
                    use: {
                        /**
                         * See here:
                         * https://stackoverflow.com/a/52323181/508797
                         * https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/ 
                         */
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ["@babel/preset-react", {
                                    "development": true,
                                }],
                                ["@babel/typescript"]
                            ],
                            "plugins": [
                                "@babel/proposal-class-properties",
                                "@babel/proposal-object-rest-spread"
                            ]
                        }
                    },
                    exclude: /node_modules/,
                }, {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            new HtmlWebPackPlugin({
                filename: "index.html",
                title: "Hello world!",
                template: "./src/index.html",
                contentBase: path.join(__dirname, 'dist'),
            }),
            new CleanWebPackPlugin()
        ],
        devServer: {
            open: true,
            openPage: "index.html",
            port: 9999,
            contentBase: path.join(__dirname, 'dist'),
        },
        optimization: {
            splitChunks: {
                chunks: 'initial',
                //   //minSize: 30000,
                //   maxSize: 150000,
                //   minChunks: 1,
                //   maxAsyncRequests: 5,
                //   maxInitialRequests: 3,
                // automaticNameDelimiter: '~',
                name:"modules",
                cacheGroups: {
                    node_modules: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        minSize: 10000,
                        maxSize: 250 * 1024
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
}
