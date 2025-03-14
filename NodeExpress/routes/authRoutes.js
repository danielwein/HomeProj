import express from "express";
import { register, login } from "../controllers/authController.js";
import {uploadFile, getRep,getZip} from "../controllers/RepController.js"
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Path where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Rename the file if necessary
    }
  });
  
  const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", login);
router.post("/upload", upload.single("file"),uploadFile)
router.post("/reps",getRep)
router.post("/getzip",getZip)
export default router;
