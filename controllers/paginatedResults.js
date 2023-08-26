const paginatedResults = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;
  
      const start = (page - 1) * limit;
      const end = page * limit;
  
      const result = {};
  
      try {
        const totalDocuments = await model.countDocuments().exec();
  
        if (start > 0) {
          result.previous = {
            page: page - 1,
            limit: limit,
          };
        }
  
        if (end < totalDocuments) {
          result.next = {
            page: page + 1,
            limit: limit,
          };
        }
  
        result.series = await model.find().sort({ _id: -1 }).limit(limit).skip(start).exec();
  
        // Send the paginated results in the response body
        res.paginatedResults = result;
        next();
      } catch (err) {
        console.log(err)
      }
    };
  };
  
  module.exports = paginatedResults;
  