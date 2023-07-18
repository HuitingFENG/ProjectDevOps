const path = require("path");
const multer = require("multer");
// const createError = require("http-errors")

function uploader(fileTypes, maxFileSize, req) {
  // file upload folder
  const UPLOAD_FOLDER = `public/uploads/`;
  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);

      const updatedFileName =
        `${req.body.name}_${req.body.surname}` + "-" + Date.now() + fileExt;

      cb(null, updatedFileName);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Image upload failed"));
      }
    },
  });

  return upload;
}

module.exports = uploader;
