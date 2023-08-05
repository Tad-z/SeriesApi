const multer = require("multer");
const path = require("path");

// function getRootDirectory() {
//   return path.resolve(__dirname, "../"); // Adjust the number of '..' based on your folder structure
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  // destination: function (req, file, cb) {
  //   const rootDirectory = getRootDirectory();
  //   cb(null, path.join(rootDirectory, 'uploads'));
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
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});