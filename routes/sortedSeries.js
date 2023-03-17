const { sortSeriesByGenre, sortSeriesByStatus } = require("../controllers/series.controller.js");
const express = require("express")
const router = express.Router();

router.get("/", sortSeriesByGenre);
router.get("/status", sortSeriesByStatus);

module.exports = router