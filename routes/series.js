const { postSeries, getAllSeries, deleteAllSeries, updateSeries } = require("../controllers/series.controller.js");
const { deleteSeries } = require("../controllers/series.controller.js");
const express = require("express")
const router = express.Router();
// const Series = require("../models/series.js")
// const { upload } = require("../controllers/uploads")
// const paginatedResults = require("../controllers/paginatedResults");
const uploadFilesMiddleware = require("../controllers/uploads.js");


router.post("/", uploadFilesMiddleware, postSeries);
router.get("/", getAllSeries);
router.delete("/", deleteAllSeries);
router.patch("/:id", updateSeries);
router.delete("/:id", deleteSeries);

module.exports = router
