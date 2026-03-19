const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// biome-ignore lint/correctness/noGlobalDirnameFilename: 跟Windows的NodeJS ESM导入器说去吧
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
