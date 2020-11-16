module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "zLOT HEGIC POOL";
                return args;
            })
    }
}
