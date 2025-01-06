import express from "express";
import { generateImage } from "./helpers/generate-image";
import { generateMetadata } from "./helpers/generate-metadata";
import cors from "cors";
import {
  allTokens,
  getCirculatingSupply,
  getMetrics,
  getSupply,
} from "./services/TokenService";
import { environment } from "./environment";
import { getLandStatCachedData } from "./services/LandStatSevice";

const app = express();
app.use(cors());
app.use((req: express.Request, res: express.Response, next: Function) => {
  if (!req.url.endsWith(".png") && req.url !== "/metrics") {
    console.log("ACCESS LOG", req.url);
  }
  next();
});

app.get("/clny-supply", (req: express.Request, res: express.Response) => {
  getSupply().then((supply) => {
    res.send(supply);
  });
});

app.get(
  "/clny-circulating-supply",
  (req: express.Request, res: express.Response) => {
    getCirculatingSupply().then((supply) => {
      res.send(supply);
    });
  }
);

app.get("/tokens", (req: express.Request, res: express.Response) => {
  res.json(allTokens);
});

app.get("/metrics", (req: express.Request, res: express.Response) => {
  res.json(getMetrics());
});

app.get("/clny-stat", (req: express.Request, res: express.Response) => {
  res.json(getLandStatCachedData());
});

// image for a token
app.get("/:token.png", (req: express.Request, res: express.Response) => {
  const { token } = req.params;

  const tokenNumber = parseInt(token);
  if (Number.isNaN(tokenNumber) || tokenNumber < 1 || tokenNumber > 21000) {
    res.status(404).end();
    return;
  }
  const image = Buffer.from(generateImage(parseInt(token)), "base64");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": image.length,
  });
  res.end(image);
});

// metadata
app.get("/:token", (req: express.Request, res: express.Response) => {
  const { token } = req.params;
  const tokenNumber = parseInt(token);
  if (Number.isNaN(tokenNumber) || tokenNumber < 1 || tokenNumber > 21000) {
    res.status(404).end();
    return;
  }
  generateMetadata(tokenNumber).then((meta) => {
    if (meta === null) {
      res.sendStatus(404);
    } else {
      res.json(meta);
    }
  });
});

app.use((req: express.Request, res: express.Response, next: Function) => {
  res.status(404).end();
});

app.listen(environment.PORT, "127.0.0.1", () => {
  console.log("server started", environment.PORT);
});
