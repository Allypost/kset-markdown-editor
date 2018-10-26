const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';

const node = {
    mode,
    entry: [
        '@babel/polyfill',
        './server.js',
    ],
    output: {
        path: path.resolve(__dirname),
        filename: 'server.production.js',
    },
    target: 'async-node',
    node: {
        __dirname: true,
    },
};

const js = {
    mode,
    entry: {
        index: [
            path.resolve(__dirname, 'static/js/index.js'),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/js/',
        chunkFilename: '[id].[chunkhash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new ClosureCompilerPlugin(
            {
                compiler: {
                    language_in: 'ECMASCRIPT_NEXT',
                    language_out: 'ECMASCRIPT3',
                    compilation_level: 'ADVANCED',
                    use_types_for_optimization: false,
                    rewrite_polyfills: true,
                    debug: true,
                    isolation_mode: 'IIFE',
                },
                concurrency: 3,
            },
        ),
    ],
};

const css = {
    mode,
    entry: {
        index: [
            path.resolve(__dirname, 'static/scss/index.scss'),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/css'),
        publicPath: '/css/',
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => ([
                                require('postcss-font-magician')({}),
                                require('pixrem')(),
                                require('autoprefixer')({ browsers: '> 0.01%' }),
                                require('cssnano')(),
                            ]),
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
};

module.exports = [ node, js, css ];
