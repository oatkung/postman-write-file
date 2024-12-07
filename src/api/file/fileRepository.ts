import { env } from "@/common/utils/envConfig";
import { FileModel } from "./fileModel";
import fs from 'fs'
import path from 'path'

function processFile(id: number, fileName : string): FileModel {
  const fullPath = path.join('./file', fileName);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fileName}`);
  }
  const fileData = fs.readFileSync(fullPath, 'base64');
  return { 
    id,
    fileData,
    fileName,
    memeType: 'image/jpeg'
  };
}


export const files: FileModel[] = [
  processFile(1, 'test.json'),
];

export class FileRepository {
  async findById(id: number): Promise<FileModel | null> {
    return files.find((f) => f.id === id) || null;
  }
}
