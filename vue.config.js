module.exports = {
  devServer: {
    host: "localhost",
    port: 13050
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/assets/scss/styles.scss";      
        `
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
};
