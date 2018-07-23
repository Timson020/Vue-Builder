const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

// 开发环境下的端口
const port = 9000

// 生产环境的页面地址
const host = './'

// 默认配置
const defaultconfig = {
	target: 'web',
	devtool: '#eval-source-map',
	resolve: {
		extensions: ['.js', '.json', '.vue', '.scss', '.css'],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'vue$': 'vue/dist/vue.esm.js',
		}
	},
	performance: {
		hints: false,
	},
}

// 开发环境配置
const developmentconfig = {
	mode: 'development',
	entry: {
		app: './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './',
		filename: './js/[name].js?[hash]',
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(scss||sass)$/,
			loader: 'style-loader!css-loader!sass-loader'
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}]
	},
	serve: {
		host: 'localhost',
		port: port,
		clipboard: true,
		hotClient: true,
		reload: false,
		logLevel: 'info',
		logTime: true,
	},
	plugins: [
		new VueLoaderPlugin(),
	],
}

// 生产环境打包配置
const releaseconfig = {
	mode: 'production',
	devtool: '',
	entry: {
		app: './src/main.js',
		vendor: ['vue', 'vuex', 'vue-resource', 'vue-router', 'vuex-persistedstate', 'immutable'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: host,
		filename: 'src/js/[name].js?[hash]',
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			loader: MiniCssExtractPlugin.loader,
		}, {
			test: /\.(scss|sass)$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
			options: {
				name: 'src/font/[name].[ext]?[hash]',
			},
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: 'src/img/[name].[ext]?[hash]',
			},
		}],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "vendor",
					chunks: "initial",
					minChunks: 2,
				},
			},
		},
	},
	plugins: [
		// 最新版vue-loader必须添加
		new VueLoaderPlugin(),
		// 插件中的全局变量
		new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
		// loder里面的配置
		new webpack.LoaderOptionsPlugin({ minimize: true }),
		// css
		new MiniCssExtractPlugin({ filename: 'src/css/style.css', chunkFilename: "[id].css" }),
		// html
		new htmlWebpackPlugin({
			title: '{{name}}',
			filename: 'index.html', // 通过模板生成的文件名
			template: 'index.html', // 模板路径
			inject: 'body', // 是否自动在模板文件添加 自动生成的js文件链接
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			}
		})
	],
}

const config = Object.assign(defaultconfig, isProd ? releaseconfig : developmentconfig)

module.exports = config
