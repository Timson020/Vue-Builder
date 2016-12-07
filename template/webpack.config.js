let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 自定义开发webpack.js
let webpackBuild = require('./src/Config/WebpackConfig/webpack.config.build.js');
let webpackDev = require('./src/Config/WebpackConfig/webpack.config.dev.js');

let config = {
	entry: {
		app: './src/app.js',
		vendor: ['vue']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist/',
		filename: '[name].js'
	},
	module: {
		rlues: [{
			test: /.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					css: ExtractTextPlugin.extract({
						loader: 'css-loader',
						fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
					})
				}
			}
		}, {
			test: /.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /.(scss|sass)$/,
			loader: 'style-loader!css-loader!sass-loader'
		}, {
			test: /.(jpg|jpeg|png|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.vue', '.js', '.css', '.scss', '.sass'],
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devServer: {
		contentBase: "./src", // 本地服务器所加载的页面所在的目录
		historyApiFallback: true, // 不跳转
		noInfo: true, // 
		colors: true // 终端中输出结果为彩色
	},
	devtool: '#eval-source-map'
};

if (process.env.env === 'pro') {
	config.devtool = '#source-map';
	config.plugins = (config.plugins || []).concat([
		// 
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		// js代码压缩
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		// 
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		// 样式分开打包
		new ExtractTextPlugin("[name].css")
	]);
};

module.exports = config;