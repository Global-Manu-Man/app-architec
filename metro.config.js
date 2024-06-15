const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
