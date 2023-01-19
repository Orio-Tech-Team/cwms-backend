import util from "util";
import multer from "multer";
const maxSize: number = 2 * 1024;
//
let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, __dirname + "/resources/static/assets/uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
//
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
//
let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;
