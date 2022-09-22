const { postSeries, getAllSeries, deleteAllSeries, updateSeries } = require("../controllers/series.controller.js");
const express = require("express")
const router = express.Router();
const { upload } = require("../controllers/uploads")

router.post("/", upload.single("image"), postSeries);
router.get("/", getAllSeries);
router.delete("/", deleteAllSeries);
router.patch("/:id", updateSeries);

module.exports = router
