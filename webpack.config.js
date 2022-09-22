import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const __dirname = path.resolve();
console.log('process.env.NODE_ENV = ', process.env.NODE_ENV)

const config = {
  entry: './src/index.js',
  output: {
    filename: './js/bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true, // 启动压缩gzip
    port: 4005, // 端口号
    open: true, // 是否自动打开浏览器
  }
}

// env是运行的命令
export default (env, args) => {
  console.log('argv.mode = ', env, args.mode)
  return config;
}