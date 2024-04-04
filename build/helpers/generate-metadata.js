"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.generateMetadata = void 0;
var contracts_addresses_1 = require("../blockchain/contracts-addresses");
var TokenService_1 = require("../services/TokenService");
var toRad = function (phi) { return (phi * Math.PI) / 180; };
var toDeg = function (phi) { return (phi / Math.PI) * 180; };
var cos = function (value) { return Math.cos(toRad(value)); };
var acos = function (value) { return toDeg(Math.acos(value)); };
var toLongPart = function (val) {
    return val % 150;
};
var toLatPart = function (val) {
    return Math.floor(val / 150);
};
var parseTokenNumber = function (tokenNumber) {
    var y = toLatPart(tokenNumber - 1);
    var x = toLongPart(tokenNumber - 1);
    return { x: x, y: y };
};
var toLong = function (val) {
    return ((val - 150 / 2) / 150) * 360;
};
var toLat = function (val) {
    if (val === 70) {
        return 0;
    }
    if (val < 70) {
        return 90 - acos(cos(90) + ((70 - val) * (cos(10) - cos(90))) / 70); // > 0
    }
    if (val > 70) {
        return -toLat(140 - val); // < 0
    }
    return 0; // for ts
};
var generateDescription = function (token) {
    var _a = parseTokenNumber(token), x = _a.x, y = _a.y;
    var latitudes = [toLat(y), toLat(y + 1)];
    var longitudes = [toLong(x), toLong(x + 1)];
    latitudes.sort(function (a, b) { return a - b; });
    longitudes.sort(function (a, b) { return a - b; });
    return "Land plot #" + token;
};
var generateAttributes = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, x, y, latitudes, longitudes, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = parseTokenNumber(token), x = _a.x, y = _a.y;
                latitudes = [toLat(y), toLat(y + 1)];
                longitudes = [toLong(x), toLong(x + 1)];
                latitudes.sort(function (a, b) { return a - b; });
                longitudes.sort(function (a, b) { return a - b; });
                return [4 /*yield*/, (0, TokenService_1.getData)(token)];
            case 1:
                data = _b.sent();
                if (data === null) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, __spreadArray([
                        (0, TokenService_1.attribute)("Longitudes", longitudes[0].toFixed(8) + " - " + longitudes[1].toFixed(8)),
                        (0, TokenService_1.attribute)("Latitudes", latitudes[0].toFixed(8) + " - " + latitudes[1].toFixed(8))
                    ], data, true)];
        }
    });
}); };
var generateMetadata = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var attributes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateAttributes(token)];
            case 1:
                attributes = _a.sent();
                if (attributes === null) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, {
                        name: "Land Plot #" + token,
                        description: generateDescription(token),
                        image: "" + contracts_addresses_1.CONTRACTS.meta + token + ".png",
                        attributes: attributes
                    }];
        }
    });
}); };
exports.generateMetadata = generateMetadata;
