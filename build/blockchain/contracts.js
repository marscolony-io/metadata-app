"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ls = exports.anyGm = exports.gms = exports.gm = exports.mc = exports.clny = void 0;
var web3_1 = __importDefault(require("web3"));
var contracts_addresses_1 = require("./contracts-addresses");
var CLNY_json_1 = __importDefault(require("../abi/CLNY.json"));
var MC_json_1 = __importDefault(require("../abi/MC.json"));
var GameManager_json_1 = __importDefault(require("../abi/GameManager.json"));
var LandStats_json_1 = __importDefault(require("../abi/LandStats.json"));
var nodeMap = {
    hartest: ["https://api.s0.b.hmny.io"],
    harmain: [
        "https://a.api.s0.t.hmny.io",
        "https://api.harmony.one",
        "https://api.s0.t.hmny.io",
    ],
    // mumbai: ["https://polygon-mumbai.g.alchemy.com/v2/" + ALCHEMY_KEY],
    polygon: [
        "https://polygon-rpc.com",
        "https://rpc-mainnet.matic.network",
        "https://matic-mainnet-archive-rpc.bwarelabs.com",
        "https://rpc.ankr.com/polygon",
    ],
    fuji: ["https://api.avax-test.network/ext/bc/C/rpc"]
};
var nodes = nodeMap[process.env.NETWORK];
var web3 = new web3_1["default"](nodeMap[process.env.NETWORK][0]);
exports.clny = new web3.eth.Contract(CLNY_json_1["default"].abi, contracts_addresses_1.CONTRACTS.CLNY);
exports.mc = new web3.eth.Contract(MC_json_1["default"].abi, contracts_addresses_1.CONTRACTS.MC);
exports.gm = new web3.eth.Contract(GameManager_json_1["default"], contracts_addresses_1.CONTRACTS.GM);
exports.gms = nodes.map(function (node) { return new new web3_1["default"](node).eth.Contract(GameManager_json_1["default"], contracts_addresses_1.CONTRACTS.GM); });
var anyGm = function () { return exports.gms[Math.floor(Math.random() * exports.gms.length)]; };
exports.anyGm = anyGm;
exports.ls = new web3.eth.Contract(LandStats_json_1["default"].abi, contracts_addresses_1.CONTRACTS.LANDSTATS);
