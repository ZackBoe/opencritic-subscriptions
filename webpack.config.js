const { resolve } = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
    return {
        entry: {
            main: resolve(__dirname, 'src', 'js', 'main.js'),
        },

        output: {
            filename: '[name].js',
            path: resolve(__dirname, 'dist', 'assets'),
            publicPath: '/assets/'
        },

        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist/assets']
            }),
            new FriendlyErrorsWebpackPlugin(),
            new webpack.DefinePlugin({
                // Dynamically access local environment variables based on the environment
                // ENV: JSON.stringify(require(path.join(__dirname, 'src', 'config', env))),
                'process.env': {
                  'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                  'NETLIFY': JSON.stringify(process.env.NETLIFY || false)
                }
              })
        ],

        optimization: {
            splitChunks: {
                chunks: 'all'
            },
        },
        
        performance: {
            maxEntrypointSize: 400000
        },

        watchOptions: {
            ignored: ['node_modules']
        },
    }
}