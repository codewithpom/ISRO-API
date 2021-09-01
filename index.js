const express = require("express")
const product = require("./api/product")
const twitter = require("./api/twitter_api")

const app = express();

const PORT = process.env.PORT || 5050;

app.use("/", product);
app.use("/twitter", twitter)

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));