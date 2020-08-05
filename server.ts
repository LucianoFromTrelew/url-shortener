import { createConfiguredApp } from "./src/server";
import express from "express";

const DIST_DIR = "dist";
const PORT = process.env.PORT || 4000;

const app = createConfiguredApp();
app.use(express.static(DIST_DIR));
app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`);
});
