const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push(
    // add
    'lottie'
);
// Mevcut transformer ve resolver yapılandırmasını ayarlıyoruz
const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

// withNativeWind ile yapılandırmayı sarıyoruz
module.exports = withNativeWind(config, { input: "./global.css" });
