const path = require('path');
const atImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = function (config, entry) {
  config.node = entry.isPluginCommand ? false : {
    setImmediate: false
  };
  config.module.rules.push({
    test: /\.(html)$/,
    use: [{
        loader: "@skpm/extract-loader",
      },
      {
        loader: "html-loader",
        options: {
          attrs: [
            'img:src',
            'link:href'
          ],
          interpolate: true,
        },
      },
    ]
  })
  config.module.rules.push({
    test: /\.(css)$/,
    include: path.join(__dirname, 'resources'),
    use: ['style-loader',
      {
        loader: "css-loader",
        options: {
          sourceMap: false,
          localsConvention: 'camelCase',
          modules: {
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false,
          ident: 'postcss',
          plugins: () => [
            atImport(),
            postcssPresetEnv({
              stage: 0,
              preserve: false,
            }),
          ],
        },
      },
    ]
  })
  config.module.rules.push({
    test: /\.css$/,
    include: path.join(__dirname, 'node_modules'),
    use: [
      'style-loader',
      {
        loader: "css-loader",
        options: {
          sourceMap: false,
        },
      }
    ]
  })
  config.module.rules.push({
    test: /\.(jpe?g|png|gif)$/,
    include: path.join(__dirname, 'assets'),
    loader: 'url-loader',
  })
}
