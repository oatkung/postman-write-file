import type { Request, RequestHandler, Response } from "express";

import { fileService } from "@/api/file/fileService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { FileModel } from "./fileModel";

class FileController {
  public create: RequestHandler = async (req: Request, res: Response) => {
    const fileModel: FileModel = req.body;
    const serviceResponse = await fileService.create(fileModel);
    return handleServiceResponse(serviceResponse, res);
  };

  public findById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await fileService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  
}

export const fileController = new FileController();
