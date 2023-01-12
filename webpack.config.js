/* eslint-disable @typescript-eslint/no-var-requires */

// System dependencies
const path = require('path')
const webpack = require('webpack')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { ModuleFederationPlugin } = webpack.container
const { NodeAsyncHttpRuntime } = require('@telenko/node-mf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

/* eslint-enable @typescript-eslint/no-var-requires */

const NAME = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_NAME || 'flex_homepage_slides_ts_modfed'
const DOMAIN_NAME = process.env.FLEX_DOMAIN_NAME || 'local.flexiness.com'
const HOSTNAME = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME || DOMAIN_NAME
const PORT = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PORT || 4008;
const PROTOCOL = process.env.FLEX_PROTOCOL || 'http'
const HOST = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOST || `${PROTOCOL}://${HOSTNAME}:${PORT}`;

const mode = process.env.NODE_ENV || 'production'
const prod = mode === 'production'

const rootLocation = './'
// const rootLocation = require.main.paths[0].split('node_modules')[0].slice(0, -1)

// const findWorkspaceRoot = require('find-yarn-workspace-root')
// const workspacePath = findWorkspaceRoot(__dirname)
// const rootLocation = path.relative(__dirname, workspacePath)
console.log('rootLocation : ', rootLocation)
console.log('host : ', HOST)

// const depsMonorepo = require(`${rootLocation}/package.json`).dependencies
const deps = require('./package.json').dependencies

const getConfig = (target) => ({

  experiments: {
    // asyncWebAssembly: true,
    // buildHttp: true,
    // layers: true,
    // lazyCompilation: true,
    // outputModule: true,
    // syncWebAssembly: true,
    topLevelAwait: true,
  },

  entry: {
    [`mainEntry_${NAME}`]: [
      require.resolve('regenerator-runtime/runtime.js'),
      path.resolve(__dirname, 'src/index')
    ],
  },

  context: __dirname, // to automatically find tsconfig.json

  ...(target === 'web'
    ? {
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
        },
        open: false,
        compress: true,
        port: new Number(PORT),
      },
    } : null
  ),

  // mode: 'development',
  mode: mode,

  target: target === 'web' ? 'browserslist:last 1 chrome version' : false,

  output: {
    path: path.resolve(__dirname, 'build', target),
    publicPath: `${HOST}/${target}/`,
    crossOriginLoading: 'anonymous',
    clean: true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },

  optimization: {
    runtimeChunk: false,
  },

  // https://webpack.js.org/configuration/cache/#gitlab-cicd
  cache: {
    type: 'filesystem',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.d.ts', '.ttf', '.scss'],
    plugins: [
      // new TsconfigPathsPlugin({
      //   configFile: path.resolve(__dirname, 'tsconfig.build.json'),
      // })
    ],
    
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify')
    },

    alias: {
    }
  },
  
  module: {
    rules: [

      {
        test: /\.(tsx|ts|jsx|js)?$/,
        loader: require.resolve('ts-loader'),
        exclude: /node_modules/,
      },

      // ///////////////////////////////////////////////////////

      {
        test: /\.html$/i,
        loader: require.resolve('html-loader'),
      },

      // ///////////////////////////////////////////////////////

      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
            options: {
              // Pass options to marked
              // See https://marked.js.org/using_advanced#options
            },
          },
        ],
      },

      // ///////////////////////////////////////////////////////

      {
        test: /\.css$/i,
        use: [
          ...(target === 'web' ? [MiniCssExtractPlugin.loader] : []),
          {
            loader: require.resolve('css-loader'),
            options: {
              esModule: false,
            }
          }
        ]
      },

      // ///////////////////////////////////////////////////////
      
      // {
      //   test: /\.module\.s(a|c)ss$/i,
      //   use: [
      //     ...(target === 'web' ? [MiniCssExtractPlugin.loader] : []),
      //     // MiniCssExtractPlugin.loader,
      //     {
      //       loader: require.resolve('css-loader'),
      //       options: {
      //         esModule: true,
      //         sourceMap: mode === 'development',
      //         importLoaders: 1,
      //         ...(process.env.FLEX_GATEWAY_MODULE_CSS === 'default'
      //           ? {
      //             modules: {
      //               exportLocalsConvention: 'camelCase',
      //               localIdentName: '[local]__[hash:base64:5]'
      //             },
      //           } : null),
      //         ...(process.env.FLEX_GATEWAY_MODULE_CSS === 'named'
      //           ? {
      //             modules: {
      //               namedExport: true,
      //               exportLocalsConvention: 'camelCaseOnly',
      //               exportOnlyLocals: target === 'node',
      //               // localIdentName: mode === 'production'
      //               //   ? '[path][name]__[local]--[hash:base64:5]'
      //               //   : '[path][name]__[local]',
      //             }
      //           } : null),
      //       },
      //     },
      //     {
      //       loader: require.resolve('sass-loader'),
      //       options: {
      //         implementation: require('sass'),
      //         sourceMap: mode === 'development'
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   exclude: /\.module.(s(a|c)ss)$/,
      //   use: [
      //     ...(target === 'web' ? [MiniCssExtractPlugin.loader] : []),
      //     // MiniCssExtractPlugin.loader,
      //     {
      //       loader: require.resolve('css-loader'),
      //       options: {
      //         esModule: false,
      //         importLoaders: 1,
      //       }
      //     },
      //     {
      //       loader: require.resolve('sass-loader'),
      //       options: {
      //         implementation: require('sass'),
      //         sourceMap: mode === 'development'
      //       },
      //     },
      //   ],
      // },
      
      // Modular Sass loaders
      // ...require(`${rootLocation}/packages/flex/config/webpack/partial/loaders/modular_sass.js`)(target),

      // ///////////////////////////////////////////////////////
      // Load font files and images
      {
        test: /\.(woff|woff2|ttf|eot|svg|jpg|jpeg|png|gif)(\?[\s\S]+)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              esModule: true
            }
          }
        ]
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: `${NAME}`,
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './App': './src/App'
      },
      shared: {
        // ...depsMonorepo,
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          // eager: true,
        },
        // 'react-dom': {
        //   singleton: true,
        //   requiredVersion: deps['react-dom'],
        // },
        // 'react-router-dom': {
        //   singleton: true,
        //   requiredVersion: deps['react-router-dom'],
        // },
        // history: {
        //   singleton: true,
        //   requiredVersion: deps['history'],
        //   // eager: true,
        // },
        // mobx: {
        //   singleton: true,
        //   requiredVersion: deps['mobx'],
        // },
        // 'mobx-react-lite': {
        //   singleton: true,
        //   requiredVersion: deps['mobx-react-lite'],
        // },
        // '@loadable/component': {
        //   singleton: true,
        //   requiredVersion: deps['@loadable/component'],
        // },
        // '@flexiness/domain-lib-mobx-react-router': {
        //   import: '@flexiness/domain-lib-mobx-react-router',
        //   requiredVersion: deps['@flexiness/domain-lib-mobx-react-router'],
        //   shareKey: '@flexiness/domain-lib-mobx-react-router', // under this name the shared module will be placed in the share scope
        //   shareScope: 'default', // share scope with this name will be used
        //   singleton: true, // only a single version of the shared module is allowed
        // },
        // '@flexiness/domain-lib-global-react': {
        //   import: '@flexiness/domain-lib-global-react',
        //   requiredVersion: deps['@flexiness/domain-lib-global-react'],
        //   shareKey: '@flexiness/domain-lib-global-react', // under this name the shared module will be placed in the share scope
        //   shareScope: 'default', // share scope with this name will be used
        //   singleton: true, // only a single version of the shared module is allowed
        // },
        // '@flexiness/domain-lib-utils': {
        //   import: '@flexiness/domain-lib-utils',
        //   requiredVersion: deps['@flexiness/domain-lib-utils'],
        //   shareKey: '@flexiness/domain-lib-utils', // under this name the shared module will be placed in the share scope
        //   shareScope: 'default', // share scope with this name will be used
        //   singleton: true, // only a single version of the shared module is allowed
        // },
        // '@flex-design-system/framework': {
        //   import: '@flex-design-system/framework',
        //   requiredVersion: deps['@flex-design-system/framework'],
        //   shareKey: '@flex-design-system/framework', // under this name the shared module will be placed in the share scope
        //   shareScope: 'default', // share scope with this name will be used
        //   singleton: true, // only a single version of the shared module is allowed
        // },
      }
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      // // @ts-expect-error
      // __GIT_BRANCH__: childProcess.execSync('git rev-parse --abbrev-ref HEAD'),
      // // @ts-expect-error
      // __GIT_COMMIT__: childProcess.execSync('git rev-parse HEAD'),

      // ensure the NODE_ENV targets production, making react optimized for production
      // with lesser checks and assertions
      // as per https://reactjs.org/docs/optimizing-performance.html#webpack
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify(process.env)
    }),
    ...(target === 'web'
      ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ]
      : [new NodeAsyncHttpRuntime()]
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
})

module.exports = [getConfig('web'), getConfig('node')]
