import { Express } from "express";
import morgan from "morgan";
import { connect } from "mongoose";
import { getMongoDbUri } from "./config";
import "dotenv/config";

export async function configureApp(app: Express) {
  app.use(morgan("dev"));

  app.get("/api", (req, res) => {
    res.json({
      message: "Hello world!"
    });
  });

  return connect(getMongoDbUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
