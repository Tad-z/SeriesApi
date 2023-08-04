const paginatedResults =  (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const start = (page - 1) * limit
        const end = page * limit

        const result = {}

        if (end < await model.countDocuments().exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (start > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            result.series = await model.find().sort({ _id:-1 }).limit(limit).skip(start).exec()
            res.paginatedResults = result
            next()
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
}

module.exports = paginatedResults