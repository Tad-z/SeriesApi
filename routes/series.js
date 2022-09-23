const { postSeries, getAllSeries, deleteAllSeries, updateSeries } = require("../controllers/series.controller.js");
const express = require("express")
const router = express.Router();
const Series = require("../models/series.js")
const { upload } = require("../controllers/uploads")
const paginatedResults = require("../controllers/paginatedResults.js")

router.post("/", upload.single("image"), postSeries);
router.get("/", paginatedResults(Series), getAllSeries);
router.delete("/", deleteAllSeries);
router.patch("/:id", updateSeries);

module.exports = router
