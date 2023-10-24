const { postSeries, getAllSeries, deleteAllSeries, updateSeries, getAllSeriesPaginated } = require("../controllers/series.controller.js");
const { deleteSeries } = require("../controllers/series.controller.js");
const express = require("express");
const router = express.Router();;
const uploadFilesMiddleware = require("../controllers/uploads.js");


router.post("/", uploadFilesMiddleware, postSeries);
router.get("/", getAllSeries);
router.get("/page", getAllSeriesPaginated);
router.delete("/", deleteAllSeries);
router.patch("/:id", updateSeries);
router.delete("/:id", deleteSeries);

module.exports = router
