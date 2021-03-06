const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css", "json"];
process.env.VUE_APP_TIME = new Date().valueOf();

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //lintOnSave: true,
  publicPath: `./`,
  transpileDependencies: ["vue-echarts", /iview.src.(?!utils.date\.js\b).+js$/, "resize-detector"],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("autoprefixer")()]
      }
    }
  },

  chainWebpack: config => {
    config.module.rule("scss").oneOfs.store.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          resources: "./src/styles/mainVariables.scss"
          // Or array of paths
          //resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end();
    });

    config.resolve.alias.set("@", resolve("src"));
  },

  devServer: {
    port: 8043,
    proxy: {
      "/api/": {
        target: "http://localhost:7066",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: {
    // devtool: false,
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 1000,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 5,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true
          },
          dll: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex|iview)[\\/]/,
            name: "dll",
            chunks: "all"
          }
        }
      }
    },

    plugins: [
      new CompressionWebpackPlugin({
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new WebpackNotifierPlugin({ alwaysNotify: true })
    ]
  }
};
