"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.environment = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1["default"].config();
exports.environment = {
    NETWORK: process.env.NETWORK,
    PORT: process.env.PORT
};
// export const environment = cleanEnv(process.env, {
//   // NETWORK: str({ choices: ["harmain", "mumbai", "polygon", "fuji"] }),
//   NETWORK: "polygon" as any,
//   PORT: num({ default: 8000 }),
// });
