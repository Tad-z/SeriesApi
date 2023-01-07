const Series = require("../models/series.js");

exports.postSeries = async (req, res) => {
  try {
    const checkName = Series.find({ name: req.body.name.toLowerCase() }).exec();
    if ((await checkName).length > 0) {
      return res.status(400).json({
        message:
          "Series already exists choose another of your favourite series",
      });
    } else {
      const series = new Series({
        image: req.file.path,
        name: req.body.name.toLowerCase(),
        genre: req.body.genre,
        FavCast: req.body.FavCast,
        status: req.body.status,
      });
      const s = await series.save();
      res.status(200).json(s);
    }
    
  } catch (err) {
    console.log(err.message);
  }
};
exports.getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().exec();
    if (!series.length) return res.json([]);
    count = series.length;
    const result = await res.paginatedResults;
    res.status(200).json({
      message: "Series retrieved successfully",
      count,
      result,
      // count: series.length,
      // series
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getSeries = async (req, res) => {};

exports.updateSeries = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    await Series.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.json({
          message: `Cannot update Series with id=${id}. Maybe Product was not found!`,
        });
      } else res.json({ message: "Series was updated successfully." });
    });
  } catch (err) {
    console.log(err.message);
    res.json("error");
  }
};

exports.deleteAllSeries = async (req, res) => {
  try {
    await Series.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} Series were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all Series.",
    });
  }
};

exports.deleteSeries = async (req, res) => {};
