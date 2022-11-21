const path = require('path')

const common = {
  entry: path.resolve(__dirname, './src/app.js'),
  output: path.resolve(__dirname, './dist/index.js'),
  libPath: path.resolve(__dirname, './lib')
}

module.exports = {
  build: {
    ...common,
    minify: true
  },
  watch: {
    ...common,
    sourcemark: true
  },
  serve: {
    ...common,
    distPath: path.resolve(__dirname, './dist'),
    sourcemark: true,
    livereload: true,
    port: 8080
  }
}
