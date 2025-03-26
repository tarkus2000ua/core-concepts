const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', { runtime: 'automatic' }]
                  ]
                }
              }
            },
            {
              test: /\.css$/,
              use: ['null-loader']
            }
          ]
        }
      }
    }
  }
})