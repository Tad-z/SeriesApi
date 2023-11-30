const util = require("util");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
    cb(null, true);
  } else {
    cb(new Error("Make sure the image file extension is jpeg/jpg or png"), false);
  }
};
let uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("image");

let uploadFilesMiddleware = util.promisify(uploadImage);
module.exports = uploadFilesMiddleware;