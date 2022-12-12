const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const HttpStatus = require("http-status-codes");

const db = require("./src/utils/db");
const movieRouter = require("./src/routes/movie.route");
const cineRouter = require("./src/routes/cine.route");
const userRouter = require("./src/routes/users.route");
const genreRouter = require("./src/routes/genre.route");
const personRouter = require("./src/routes/person.route");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("cine-api is running");
});

app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cines", cineRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/persons", personRouter);
app.use((error, req, res, next) => {
  console.log("ERRO", error);
  res
    .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ errorMessage: error.message });
});

app.listen(port, () => {
  console.log(`cine-api running on port ${port}`);
});
