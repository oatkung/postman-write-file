import { StatusCodes } from "http-status-codes";
import { env } from "@/common/utils/envConfig";
import type { User } from "@/api/user/userModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { FileModel } from "./fileModel";
import path from "path";
import fs from "fs";
import { FileRepository } from "./fileRepository";

export class FileService {

  private fileRepository: FileRepository;

  constructor(repository: FileRepository = new FileRepository()) {
    this.fileRepository = repository;
  }

  // Retrieves all users from the database
  async create(file: FileModel): Promise<ServiceResponse<FileModel | null>> {
    const fullPath = path.join(env.FILE_OUTPUT_PATH, file.fileName);
    try {
      fs.writeFileSync(fullPath, file.fileData, 'base64');
    } catch (ex) {
      const errorMessage = `Error writing file: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while writing file.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    return ServiceResponse.success<FileModel>("FileModel created", file);
  }

  async findById(id: number): Promise<ServiceResponse<FileModel | null>> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      return ServiceResponse.failure("File not found", null, StatusCodes.NOT_FOUND);
    }
    return ServiceResponse.success<FileModel>("File found", file);
  }
}

export const fileService = new FileService();
