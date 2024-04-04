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
exports.__esModule = true;
exports.getMetrics = exports.getCirculatingSupply = exports.getSupply = exports.getData = exports.attribute = exports.allTokens = void 0;
var contracts_1 = require("../blockchain/contracts");
var contracts_addresses_1 = require("../blockchain/contracts-addresses");
/**
 * This fills allTokens
 */
exports.allTokens = [];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var start, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 7];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, contracts_1.mc.methods
                        .allTokensPaginate(start, start + 999)
                        .call()];
            case 3:
                data = _a.sent();
                exports.allTokens.push.apply(exports.allTokens, data.map(function (id) { return parseInt(id); }));
                start += data.length;
                if (start >= 21000) {
                    return [3 /*break*/, 7];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log("paginate", error_1.message);
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, new Promise(function (rs) { return setTimeout(rs, 1000); })];
            case 6:
                _a.sent();
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); })();
var tokenData = new Map();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUNCH_SIZE, i, bunch, k, data, _i, data_1, item, tokenNumber, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUNCH_SIZE = 500;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 10];
                return [4 /*yield*/, new Promise(function (rs) { return setTimeout(rs, 5000); })];
            case 2:
                _a.sent();
                if (exports.allTokens.length === 0) {
                    return [3 /*break*/, 1];
                }
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < exports.allTokens.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, new Promise(function (rs) { return setTimeout(rs, 2000); })];
            case 4:
                _a.sent();
                bunch = [];
                k = i;
                while (k < Math.min(i + BUNCH_SIZE, exports.allTokens.length)) {
                    bunch.push(exports.allTokens[k]);
                    k++;
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, (0, contracts_1.anyGm)().methods.getAttributesMany(bunch).call()];
            case 6:
                data = _a.sent();
                k = i;
                for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                    item = data_1[_i];
                    tokenNumber = exports.allTokens[k];
                    tokenData.set(tokenNumber, {
                        earned: item.earned * 1e-18,
                        speed: parseInt(item.speed),
                        baseStation: parseInt(item.baseStation) ? true : false,
                        transport: parseInt(item.transport),
                        robotAssembly: parseInt(item.robotAssembly),
                        powerProduction: parseInt(item.powerProduction),
                        lastUpdated: new Date()
                    });
                    k++;
                }
                console.log("ok", i);
                i = i + BUNCH_SIZE;
                return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                console.log("data", error_2.message);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 3];
            case 9: return [3 /*break*/, 1];
            case 10: return [2 /*return*/];
        }
    });
}); })();
var attribute = function (trait_type, value) {
    return {
        trait_type: trait_type,
        value: value
    };
};
exports.attribute = attribute;
var getData = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var data_2, item, error_3, tokenAttrs, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(!exports.allTokens.includes(token) || !tokenData.has(token))) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, contracts_1.gm.methods.getAttributesMany([token]).call()];
            case 2:
                data_2 = _a.sent();
                console.log("WITHOUT CACHE", token);
                item = data_2[0];
                tokenData.set(token, {
                    earned: item.earned * 1e-18,
                    speed: parseInt(item.speed),
                    baseStation: parseInt(item.baseStation) ? true : false,
                    transport: parseInt(item.transport),
                    robotAssembly: parseInt(item.robotAssembly),
                    powerProduction: parseInt(item.powerProduction),
                    lastUpdated: new Date()
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [2 /*return*/, null];
            case 4:
                tokenAttrs = tokenData.get(token);
                data = [
                    (0, exports.attribute)("Data updated", tokenAttrs.lastUpdated.toUTCString()),
                    (0, exports.attribute)("Earned CLNY", tokenAttrs.earned.toFixed(3)),
                    (0, exports.attribute)(contracts_addresses_1.CONTRACTS.shares ? "Shares" : "Earning speed, CLNY/day", tokenAttrs.speed.toFixed(contracts_addresses_1.CONTRACTS.shares ? 0 : 1)),
                    (0, exports.attribute)("Base Station", tokenAttrs.baseStation ? "yes" : "no"),
                    (0, exports.attribute)("Transport LVL", tokenAttrs.transport.toFixed(0)),
                    (0, exports.attribute)("Robot Assembly LVL", tokenAttrs.robotAssembly.toFixed(0)),
                    (0, exports.attribute)("Power Production LVL", tokenAttrs.powerProduction.toFixed(0)),
                ];
                return [2 /*return*/, data];
        }
    });
}); };
exports.getData = getData;
var cachedSupply = "Error";
var cachedCirculatingSupply = "Error";
var getSupply = function () { return __awaiter(void 0, void 0, void 0, function () {
    var supply, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, contracts_1.clny.methods.totalSupply().call()];
            case 1:
                supply = _b.sent();
                cachedSupply = (supply * Math.pow(10, -18)).toFixed(3);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, cachedSupply];
        }
    });
}); };
exports.getSupply = getSupply;
var getCirculatingSupply = function () { return __awaiter(void 0, void 0, void 0, function () {
    var totalSupply, lockedSupply, _i, _a, address, balance, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                return [4 /*yield*/, contracts_1.clny.methods.totalSupply().call()];
            case 1:
                totalSupply = _c.sent();
                lockedSupply = 0;
                _i = 0, _a = contracts_addresses_1.CONTRACTS.excludeFromSupply;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                address = _a[_i];
                return [4 /*yield*/, contracts_1.clny.methods.balanceOf(address).call()];
            case 3:
                balance = _c.sent();
                lockedSupply = lockedSupply + balance * 1e-18;
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                cachedCirculatingSupply = (totalSupply * 1e-18 - lockedSupply).toFixed(3);
                return [3 /*break*/, 7];
            case 6:
                _b = _c.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, cachedCirculatingSupply];
        }
    });
}); };
exports.getCirculatingSupply = getCirculatingSupply;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var metrics, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!true) return [3 /*break*/, 6];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, contracts_1.gm.methods.saleData().call()];
            case 2:
                metrics = _b.sent();
                cachedMetrics = {
                    available: metrics.limit - metrics.minted,
                    claimed: parseInt(metrics.minted)
                };
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [4 /*yield*/, new Promise(function (rs) { return setTimeout(rs, 10000); })];
            case 5:
                _b.sent();
                return [3 /*break*/, 0];
            case 6: return [2 /*return*/];
        }
    });
}); })();
var cachedMetrics = null;
var getMetrics = function () {
    return (cachedMetrics !== null && cachedMetrics !== void 0 ? cachedMetrics : {
        available: 0,
        claimed: 0
    });
};
exports.getMetrics = getMetrics;
