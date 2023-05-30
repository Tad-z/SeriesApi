const Series = require("../models/series.js");

exports.postSeries = async (req, res) => {
  try {
    const checkName = Series.find({ name: req.body.name.toLowerCase() }).exec();
    console.log(req.file.path);
    if ((await checkName).length > 0) {
      return res.status(400).json({
        message:
          "Series already exists choose another of your favourite series",
      });
    } else {
      const series = new Series({
        image: req.file.path,
        name: req.body.name.toLowerCase(),
        genre: req.body.genre.toLowerCase(),
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

exports.sortSeriesByGenre = async (req, res) => {
  try {
    let genre = req.query.genre// get the genre value from the request body
    if (!genre) {
      return res.status(400).json({
        message: "Genre name not specified",
      });
    }
    const seriesByGenre = await Series.find({
      genre: { $regex: genre, $options: "i" },
    }).exec();
    console.log(req.body.genre);
    if (!seriesByGenre.length) return res.json([]);
    res.status(200).json({
      message: "Series retrieved successfully",
      count: seriesByGenre.length,
      seriesByGenre,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.sortSeriesByStatus = async (req, res) => {
  try {
    let status = req.query.status
    if (!status) {
      return res.status(400).json({
        message: "Status not specified",
      });
    }
    const seriesByStatus = await Series.find({
      status: { $regex: status, $options: "i" },
    }).exec();
    console.log(req.body.status);
    if (!seriesByStatus.length) return res.json([]);
    res.status(200).json({
      message: "Series retrieved successfully",
      count: seriesByStatus.length,
      seriesByStatus,
    });
  } catch (err) {
    console.log(err.message);
  }
};

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

exports.deleteSeries = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Series.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Series with id=${id}. Maybe Series was not found!`,
        });
      } else {
        res.status(200).json({
          message: "Series was deleted successfully!",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
