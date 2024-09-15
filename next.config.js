// next.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(new NodePolyfillPlugin());

      // Resolve `buffer` to its browser equivalent
      config.resolve.alias = {
        ...config.resolve.alias,
        buffer: 'buffer',
      };

      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
      };
    }

    return config;
  },
};
