const Series = require("../models/series.js");
const cloudinary = require("../utils/cloudinary.js")
const paginatedResults = require("./paginatedResults.js");


exports.postSeries = async (req, res) => {
  try {
    const checkName = await Series.find({ name: req.body.name.toLowerCase() }).exec();

    if ((checkName).length > 0) {
      return res.status(400).json({
        message: "Series already exists. Please choose another name for your series.",
      });
    }

    const path = req.file.path
    const result = await cloudinary.uploader.upload(path);

    const series = new Series({
      image: result.secure_url,
      name: req.body.name.toLowerCase(),
      genre: req.body.genre.toLowerCase(),
      FavCast: req.body.FavCast,
      status: req.body.status,
      link: req.body.link,
      cloudinary_id: result.public_id,
    });

    const savedSeries = await series.save();
    res.status(200).json(savedSeries);
  } catch (err) {
    console.error(err.message);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(500).json({
        message: "File size cannot be larger than 5MB!",
      });
    }
    res.status(500).json({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


exports.getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().exec();
    if (!series.length) return res.json([]);
    res.status(200).json({
      message: "Series retrieved successfully",
      count: series.length,
      series,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllSeriesPaginated = async (req, res) => {
  try {

    paginatedResults(Series)(req, res, async () => {
      const result = res.paginatedResults;
      if (!result) return res.json([]);

      res.status(200).json({
        message: "Series retrieved successfully",
        result
      });

    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sortSeriesByGenre = async (req, res) => {
  try {
    let genre = req.query.genre
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
