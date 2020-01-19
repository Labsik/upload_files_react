const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");


app.use(cors());
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file"), (req, res, next) => {
  return res.status(200).send(req.file);
});

app.listen(5000, () => console.log("Server Started..."));