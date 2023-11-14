import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

export const multerOptions: MulterOptions = {
  dest: "src/uploads", // this is the destination of the uploaded files on disk
  limits: {
    fileSize: 1024 * 1024 * 5, // max size 5MB
  },
  storage: diskStorage({
    destination: "src/uploads",
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    },
  }),
};
