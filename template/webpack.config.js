const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

// 开发环境下的端口
const port = 9000

// 生产环境的页面地址
const host = '/'

// 默认配置
const defaultconfig = {
	target: 'web',
	devtool: '#eval-source-map',
	resolve: {
		extensions: ['.js', '.json', '.vue', '.scss', '.css'],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@img': path.resolve(__dirname, './src/assets'),
			'vue$': 'vue/dist/vue.esm.js',
		},
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
		filename: '[name].js?[hash]',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/dist/js/',
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
			loader: ['style-loader', 'css-loader'],
		}, {
			test: /\.(scss||sass)$/,
			loader: ['style-loader', 'css-loader', 'sass-loader'],
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]',
				publicPath: '/',
			},
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]',
				publicPath: '/',
			},
		}],
	},
	devServer: {
		host: '0.0.0.0',
		port: port,
		clientLogLevel: 'info',
		historyApiFallback: true,
		hot: true,
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
}

// 生产环境打包配置
const releaseconfig = {
	mode: 'production',
	devtool: '',
	entry: {
		app: './src/main.js',
		vendor: ['vue', 'vuex', 'axios', 'vue-router', 'vuex-persistedstate', 'immutable'],
	},
	output: {
		filename: 'src/js/[name].js?[hash]',
		path: path.resolve(__dirname, './dist'),
		publicPath: host,
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
			loader: [MiniCssExtractPlugin.loader, 'css-loader'],
		}, {
			test: /\.(scss|sass)$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]',
				outputPath: './src/font/',
				publicPath: `${host}/src/font/`,
			},
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]',
				outputPath: './src/img/',
				publicPath: `${host}/src/img/`,
			},
		}],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					chunks: 'initial',
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
		new MiniCssExtractPlugin({ filename: 'src/css/style.css', chunkFilename: '[id].css' }),
		// html
		new htmlWebpackPlugin({
			title: 'demo',
			filename: 'index.html', // 通过模板生成的文件名
			template: 'index.html', // 模板路径
			inject: 'body', // 是否自动在模板文件添加 自动生成的js文件链接
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			},
		}),
	],
}

const config = Object.assign(defaultconfig, isProd ? releaseconfig : developmentconfig)

module.exports = config
