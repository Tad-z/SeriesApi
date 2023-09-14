const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cron = require('node-cron');
const axios = require('axios')
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

// Schedule the cron job to make a request every 10 minutes to keep the API alive
cron.schedule('*/30 * * * *', async () => {
    try {
      // Make a GET request to a specific endpoint (e.g., /api/keep-alive)
      const response = await axios.get(`https://series-api-nld9.onrender.com/series/?page=1`)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    } console.error('Keep-alive request error:', error);
  });

module.exports = app;
