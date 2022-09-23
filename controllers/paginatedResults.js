const paginatedResults =  (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const start = (page - 1) * limit
        const end = page * limit

        const results = {}

        if (end < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (start > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(start).exec()
            res.paginatedResults = results
            next()
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
}

module.exports = paginatedResults