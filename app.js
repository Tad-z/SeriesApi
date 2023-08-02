const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const main = require("./models/db.js");
const seriesRouter = require("./routes/series.js");
const sortedSeriesRouter = require("./routes/sortedSeries.js")



app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://series-app-six.vercel.app", "http://localhost:3001"]
}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use("/series", seriesRouter);
app.use("/sortedSeries", sortedSeriesRouter);


main()
    .then(() => {
        return console.log("DB connected...");
    }).catch(console.error);
app.listen(5000, () => {
    console.log("Server started...");
})