const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const main = require("./models/db.js");
const seriesRouter = require("./routes/series.js")


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000","https://series-app.onrender.com"]
}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))
app.use("/series", seriesRouter);


main()
    .then(() => {
        return console.log("DB connected...");
    }).catch(console.error);
app.listen(5000, () => {
    console.log("Server started...");
})