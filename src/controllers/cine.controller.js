const Cine = require("../models/cine.model");
const Movie = require("../models/movie.model");
const HttpStatus = require("http-status-codes");
const personUtil = require("../utils/person");

const save = async (req, res, next) => {
  try {
    const data = req.body;
    const newCine = new Cine(data);
    const savedCine = await newCine.save();
    if (!savedCine) {
      throw new Error("Cine cold not be saved");
    }
    for (let movie of savedCine.moviesTheaters) {
      movie.screenwrite = await personUtil.directionOrScreenwrite(
        movie.screenwrite
      );
      movie.direction = await personUtil.directionOrScreenwrite(
        movie.direction
      );
      movie.cast = await personUtil.cast(movie.cast);
    }
    res
      .status(HttpStatus.StatusCodes.CREATED)
      .json({ message: "New Cine created" });
  } catch (err) {
    next(err);
  }
};

const listAll = async (req, res, next) => {
  try {
    const cines = await Cine.find();
    for (let cine of cines) {
      cine.moviesTheaters = await getMovies(cine.moviesTheaters);
    }
    res.status(HttpStatus.StatusCodes.OK).json(cines);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cine = await Cine.findById(id);
    if (!cine) {
      throw new Error(`Cine with id ${id} not found`);
    }
    cine.moviesTheaters = await getMovies(cine.moviesTheaters);
    res.status(HttpStatus.StatusCodes.OK).json(cine);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const cine = await Cine.findById(id);
    if (!cine) {
      throw new Error(`Cine with id ${id} not found`);
    }

    const newCine = await Cine.findByIdAndUpdate(id, data, { new: true });
    newCine.moviesTheaters = await getMovies(newCine.moviesTheaters);
    res.status(HttpStatus.StatusCodes.OK).json(newCine);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cine = await Cine.findById(id);
    if (!cine) {
      throw new Error(`Cine with id ${id} not found`);
    }
    await Cine.findByIdAndDelete(id);
    res
      .status(HttpStatus.StatusCodes.OK)
      .json({ message: `Cine with id ${id} has deleted` });
  } catch (err) {
    next(err);
  }
};
async function getMovies(movies) {
  let moviesList = [];
  for (let m of movies) {
    let movie = await Movie.findById(m);
    if (movie) {
      movie.screenwrite = await personUtil.directionOrScreenwrite(
        movie.screenwrite
      );
      movie.direction = await personUtil.directionOrScreenwrite(
        movie.direction
      );
      movie.cast = await personUtil.cast(movie.cast);
      moviesList.push(movie);
    }
  }
  return moviesList;
}
module.exports = {
  save,
  listAll,
  getById,
  update,
  remove,
};
