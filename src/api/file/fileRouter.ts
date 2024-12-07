import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { fileController } from "./fileController";
import { CreateFileSchema, FileSchema, GetFileSchema } from "./fileModel";

export const fileRegistry = new OpenAPIRegistry();
export const fileRouter: Router = express.Router();

fileRegistry.register("File", FileSchema);

fileRegistry.registerPath({
  method: "post",
  path: "/file",
  tags: ["File"],
  responses: createApiResponse(FileSchema, "Success"),
});

fileRouter.post("/", validateRequest(CreateFileSchema), fileController.create);

fileRegistry.registerPath({
  method: "get",
  path: "/file/{id}",
  tags: ["File"],
  request: { params: GetFileSchema.shape.params },
  responses: createApiResponse(FileSchema, "Success"),
});

fileRouter.get("/:id", validateRequest(GetFileSchema), fileController.findById);
