const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const path = require("path");
require("dotenv").config();

const cors = require("cors");
const main = require("./models/db.js");
const seriesRouter = require("./routes/series.js");
const sortedSeriesRouter = require("./routes/sortedSeries.js")

global.__basedir = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://seriesapp.netlify.app", "https://series-app-six.vercel.app", "http://localhost:3001"]
}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use("/series", seriesRouter);
app.use("/sortedSeries", sortedSeriesRouter);


main()
    .then(() => {
        app.listen(5000, () => {
            console.log("Server started...");
        })
        return console.log("DB connected...");
    }).catch(console.error);
