import express, { Express, json, urlencoded } from "express";
import morgan from "morgan";
import { connect } from "mongoose";
import { getMongoDbUri } from "./config";
import "dotenv/config";

import { ShortUrlModel } from "./models/url.model";
import { prepareData, isValidationError } from "./utils";

export interface IncomingShortUrlData {
  url: string;
}

export interface ShortUrl {
  id: string;
  url: string;
  slug: string;
}

export interface ListRouteResponse {
  status: string;
  data: ShortUrl[];
}

export interface CreateRouteResponse {
  status: string;
  data: ShortUrl;
}

export interface ErrorResponse {
  status: string;
  msg: string;
}

export function configureApp(app: Express) {
  app.use(morgan("dev"));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.get("/api", (req, res) => {
    res.json({
      message: "Hello world!"
    });
  });

  app.get("/api/url", async (req, res) => {
    return res.status(200).json({
      status: "Success",
      data: (await ShortUrlModel.find({})).map(prepareData)
    } as ListRouteResponse);
  });

  app.post("/api/url", async (req, res) => {
    const { url }: IncomingShortUrlData = req.body;
    try {
      const shortUrl = await ShortUrlModel.create({ url });
      return res.status(201).json({
        status: "Success",
        data: prepareData(shortUrl)
      } as CreateRouteResponse);
    } catch (error) {
      if (isValidationError(error)) {
        return res
          .status(400)
          .json({ status: "Failed", msg: error.message } as ErrorResponse);
      }

      return res.status(500).json({
        status: "Failed",
        msg: `Could not create Short URL ${error}`
      } as ErrorResponse);
    }
  });

  return connect(getMongoDbUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export function createConfiguredApp(): Express {
  const app = express();
  configureApp(app);
  return app;
}
