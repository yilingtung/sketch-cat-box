const path = require('path');

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
      },
    ]
  })
}
