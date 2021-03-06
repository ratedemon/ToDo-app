module.exports = {
  // входная точка нашего приложения
  entry : './js/index.js',
  output: {
    // результат работы Webpack будет в файле с таким именем
    filename: './build/index.js'
  },
  resolveLoader:{
    modules: ["node_modules"],
    moduleExtensions: ['-loader'],
    extensions: ["*", ".js"]
  },
  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel',
        query  : {
          presets: [ 'es2015' ]
        }
      },
      {
        test   : /\.scss$/,
        exclude: /node_modules/,
        loader : 'style!css!sass'
      }
    ]
  }
};