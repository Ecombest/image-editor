const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const MAX_ENTRYPOINT_SIZE = 512000;
const OUTPUT_PATH = path.resolve(__dirname, "build");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const config = {
    entry: "./src/index.tsx",
    mode: "development",
    devServer: {
      static: OUTPUT_PATH,
      port: 4000,
    },
    performance: {
      hints: false,
      maxEntrypointSize: MAX_ENTRYPOINT_SIZE,
      maxAssetSize: MAX_ENTRYPOINT_SIZE,
    },
    output: {
      filename: "bundle.js",
      path: OUTPUT_PATH,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: ["file-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "image_editor",
        library: { type: "var", name: "image_editor" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: {
          react: isProduction ? { singleton: true } : { eager: true },
          "react-dom": isProduction ? { singleton: true } : { eager: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
  return config;
};
