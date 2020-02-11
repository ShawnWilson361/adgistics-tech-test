const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const webpack = require('webpack');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const path = require('path');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const plugins = [
  [
    sass,
    {
      sassOptions: {
        includePaths: ['components/*', 'pages/*']
      }
    }
  ],
  [
    withCSS,
    {
      cssModules: true
    }
  ],
  [
    withBundleAnalyzer,
    {
      analyzeServer: false,
      analyzeBrowser: false,
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../../bundles/server.html'
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html'
        }
      }
    }
  ]
];

const nextConfig = {
  // useFileSystemPublicRoutes: false,
  poweredByHeader: false,
  target: 'serverless',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
};

module.exports = withPlugins(plugins, nextConfig);
