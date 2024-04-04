"use strict";
exports.__esModule = true;
exports.generateImage = void 0;
var canvas_1 = require("canvas");
// @ts-ignore
var blockies_1 = require("@download/blockies");
var environment_1 = require("../environment");
var canvas = (0, canvas_1.createCanvas)(50, 50);
var cache = new Array(21000);
var CHAIN_DATA = {
    harmain: ["#dddd44", "#774455", "#dd2233", "", 10],
    fuji: ["#dddd44", "#774455", "#dd2233", "", 10],
    mumbai: ["#803bd4", "#b176ea", "#413f67", "^&", 10],
    polygon: ["#803bd4", "#b176ea", "#413f67", "^&", 10]
};
var generateImage = function (token) {
    if (cache[token - 1]) {
        return cache[token - 1];
    }
    var _a = CHAIN_DATA[environment_1.environment.NETWORK], color = _a[0], bgcolor = _a[1], spotcolor = _a[2], seedSalt = _a[3], size = _a[4];
    var icon = (0, blockies_1.renderIcon)({
        seed: token.toString() + seedSalt,
        color: color,
        bgcolor: bgcolor,
        size: size,
        scale: 100,
        spotcolor: spotcolor
    }, canvas);
    var str = icon.toDataURL().split(",")[1]; // ltrim "data:image/png;base64,"
    cache[token - 1] = str;
    return str;
};
exports.generateImage = generateImage;
