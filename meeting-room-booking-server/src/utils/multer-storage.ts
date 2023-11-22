import * as fs from 'fs';
import * as multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) {
      console.log(e);
    }
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;

    cb(null, uniqueSuffix);
  },
});

export { multerStorage };
