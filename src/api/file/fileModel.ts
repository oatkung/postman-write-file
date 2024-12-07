import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type FileModel = z.infer<typeof FileSchema>;
export const FileSchema = z.object({
  id: z.number(),
  fileData: z.string(),
  fileName: z.string(),
  memeType: z.string(),
});

// Input Validation for 'POST file/' endpoint
export const CreateFileSchema = z.object({
  body: FileSchema.omit({ id: true }),
});


export const GetFileSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});