const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const deps = require("./package.json").dependencies;
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
  devServer: {
    
    
    open: true,
    headers: {
      "Access-Control-Allow-Origin":
        "*,https://mfa.magically.in/ ,http://localhost:300,http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: true,
  },
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new ExternalTemplateRemotesPlugin(),

    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        //Your Remote MFE's
        RemoteCatalog:
          "CatalogRemote@http://localhost:3000/catalogRemoteEntry.js",
        RemoteSourcing: "sourcing@http://localhost:4001/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: false, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: false,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
