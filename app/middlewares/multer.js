import multer from "multer";
import path from "path";

import dotenv from 'dotenv';
dotenv.config();


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
