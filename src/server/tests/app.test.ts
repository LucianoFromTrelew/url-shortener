import express, { Express } from "express";
import request from "supertest";
import {
  configureApp,
  IncomingShortUrlData,
  ShortUrl,
  CreateRouteResponse
} from "..";
import * as mongoose from "mongoose";
import { ShortUrlModel } from "../models/url.model";

describe("App", () => {
  let app: Express;
  let mongoose: mongoose.Mongoose;

  beforeAll(async () => {
    process.env.MONGO_DB = "test";
    app = express();
    mongoose = await configureApp(app);
  });

  afterEach(async () => {
    await ShortUrlModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("Create", () => {
    it("creates short url correctly", async () => {
      const res = await request(app)
        .post("/api/url")
        .send({
          url: "https://github.com/visionmedia/supertest#readme"
        } as IncomingShortUrlData);
      const shortUrls = await ShortUrlModel.find({});
      expect(res.status).toBe(201);
      expect(await ShortUrlModel.countDocuments()).toBe(1);
    });

    it("does not create duplicate short urls", async () => {
      const res1 = await request(app)
        .post("/api/url")
        .send({
          url: "https://github.com/visionmedia/supertest#readme"
        } as IncomingShortUrlData);
      const res2 = await request(app)
        .post("/api/url")
        .send({
          url: "https://github.com/visionmedia/supertest#readme"
        } as IncomingShortUrlData);
      expect(res1.status).toBe(201);
      expect(res2.status).toBe(201);
      expect((res1.body as CreateRouteResponse).data.slug).not.toBe(
        (res2.body as CreateRouteResponse).data.slug
      );
    });

    it("does not create invalid short urls", async () => {
      const res = await request(app)
        .post("/api/url")
        .send({
          url: "INVALID_URL"
        } as IncomingShortUrlData);
      expect(res.status).toBe(400);
    });
  });

  describe("List", () => {
    beforeEach(async () => {
      await Promise.all([
        ShortUrlModel.create({ url: "stackoverflow.com" }),
        ShortUrlModel.create({ url: "www.github.com" }),
        ShortUrlModel.create({ url: "https://mail.google.com/" })
      ]);
    });

    it("returns data correctly", async () => {
      const res = await request(app).get("/api/url");
      expect(res.status).toBe(200);
      expect(res.body.data as Array<ShortUrl>).toHaveLength(3);
    });
  });
});
