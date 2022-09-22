const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const __dirname = path.resolve();
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
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name][hash:8].[ext]',
              limit: 50 * 1024
            }
          }
        ]
      },
      // {
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name][hash:8].[ext]'
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    })
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
module.exports = (env, args) => {
  console.log('argv.mode = ', env, args.mode)
  return config;
}