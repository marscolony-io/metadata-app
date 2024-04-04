"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var generate_image_1 = require("./helpers/generate-image");
var generate_metadata_1 = require("./helpers/generate-metadata");
var cors_1 = __importDefault(require("cors"));
var TokenService_1 = require("./services/TokenService");
var LandStatSevice_1 = require("./services/LandStatSevice");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(function (req, res, next) {
    if (!req.url.endsWith(".png") && req.url !== "/metrics") {
        console.log("ACCESS LOG", req.url);
    }
    next();
});
app.get("/clny-supply", function (req, res) {
    (0, TokenService_1.getSupply)().then(function (supply) {
        res.send(supply);
    });
});
app.get("/clny-circulating-supply", function (req, res) {
    (0, TokenService_1.getCirculatingSupply)().then(function (supply) {
        res.send(supply);
    });
});
app.get("/tokens", function (req, res) {
    res.json(TokenService_1.allTokens);
});
app.get("/metrics", function (req, res) {
    res.json((0, TokenService_1.getMetrics)());
});
app.get("/clny-stat", function (req, res) {
    res.json((0, LandStatSevice_1.getLandStatCachedData)());
});
// image for a token
app.get("/:token.png", function (req, res) {
    var token = req.params.token;
    var tokenNumber = parseInt(token);
    if (Number.isNaN(tokenNumber) || tokenNumber < 1 || tokenNumber > 21000) {
        res.status(404).end();
        return;
    }
    var image = Buffer.from((0, generate_image_1.generateImage)(parseInt(token)), "base64");
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": image.length
    });
    res.end(image);
});
// metadata
app.get("/:token", function (req, res) {
    var token = req.params.token;
    var tokenNumber = parseInt(token);
    if (Number.isNaN(tokenNumber) || tokenNumber < 1 || tokenNumber > 21000) {
        res.status(404).end();
        return;
    }
    (0, generate_metadata_1.generateMetadata)(tokenNumber).then(function (meta) {
        if (meta === null) {
            res.sendStatus(404);
        }
        else {
            res.json(meta);
        }
    });
});
app.use(function (req, res, next) {
    res.status(404).end();
});
app.listen(process.env.PORT, "127.0.0.1", function () {
    console.log("server started", process.env.PORT);
});
