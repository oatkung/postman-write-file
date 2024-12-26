import express, { type Router } from "express";

import { env } from "@/common/utils/envConfig";

export const commonRouter: Router = express.Router();

commonRouter.get("/config", (_req, res) => {
  res.send({
    FILE_OUTPUT_PATH: env.FILE_OUTPUT_PATH,
  });
});
