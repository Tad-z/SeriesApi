const Series = require("../models/series.js");
// const uploadImage = require("../controllers/uploads.js");
const uploadFilesMiddleware = require("../controllers/uploads.js");
const paginatedResults = require("./paginatedResults.js");


// exports.uploadImage = async (req, res) => {
//   try {
//     await uploadFilesMiddleware(req, res);
//     console.log(req.file);

//   } catch (err) {

//   }
// }

exports.postSeries = async (req, res) => {
  try {
    const checkName = await Series.find({ name: req.body.name.toLowerCase() }).exec();

    if ((await checkName).length > 0) {
      return res.status(400).json({
        message: "Series already exists. Please choose another name for your series.",
      });
    }

    // await uploadFilesMiddleware(req, res);

    // if (req.file == undefined) {
    //   return res.status(400).json({
    //     message: "Please upload a file!",
    //   });
    // }

    const series = new Series({
      image: req.file.path,
      name: req.body.name.toLowerCase(),
      genre: req.body.genre.toLowerCase(),
      FavCast: req.body.FavCast,
      status: req.body.status,
    });

    const savedSeries = await series.save();
    res.status(200).json(savedSeries);
  } catch (err) {
    console.error(err.message);
    // if (err.code === "LIMIT_FILE_SIZE") {
    //   return res.status(500).json({
    //     message: "File size cannot be larger than 5MB!",
    //   });
    // }
    // res.status(500).json({
    //   message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    // });
  }
};


exports.getAllSeries = async (req, res) => {
  try {
    // Use the paginatedResults middleware to paginate series data
    paginatedResults(Series)(req, res, async () => {
      const result = res.paginatedResults;

      // Respond with the paginated data
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
