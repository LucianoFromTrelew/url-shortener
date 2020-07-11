import express, { Express } from "express";
import { configureApp } from "..";
import * as mongoose from "mongoose";
import { ShortUrlModel } from "../models/url.model";

describe("App", () => {
  let app: Express;
  let mongoose: mongoose.Mongoose;

  beforeAll(async () => {
    app = express();
    mongoose = await configureApp(app);
  });

  afterEach(async () => {
    await ShortUrlModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("works", async () => {
    const shortUrl = await ShortUrlModel.create({
      url: "https://github.com/typegoose/typegoose",
      slug: "asdas"
    });
    const count = await ShortUrlModel.countDocuments();
    expect(count).toBe(1);
  });
});
