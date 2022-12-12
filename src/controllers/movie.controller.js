const Movie = require("../models/movie.model");
const messages = require("../utils/bundle");
const HttpStatus = require("http-status-codes");
const personUtil = require("../utils/person");
const Genre = require("../models/genre.model");
const save = async (req, res, next) => {
  try {
    const data = req.body;
    const newMovie = new Movie(data);
    const savedMovie = await newMovie.save();
    if (!savedMovie) {
      throw new Error(messages.movieNotSave);
    }
    savedMovie.screenwrite = await personUtil.directionOrScreenwrite(
      savedMovie.screenwrite
    );
    savedMovie.direction = await personUtil.directionOrScreenwrite(
      savedMovie.direction
    );
    savedMovie.cast = await personUtil.cast(savedMovie.cast);
    res
      .status(HttpStatus.StatusCodes.CREATED)
      .json({ message: messages.movieCreated });
  } catch (err) {
    next(err);
  }
};

const listAll = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    for (let movie of movies) {
      if (movie.genre) {
        movie.genre = await Genre.findById(movie.genre);
      }
      movie.screenwrite = await personUtil.directionOrScreenwrite(
        movie.screenwrite
      );
      movie.direction = await personUtil.directionOrScreenwrite(
        movie.direction
      );
      movie.cast = await personUtil.cast(movie.cast);
    }
    res.status(HttpStatus.StatusCodes.OK).json(movies);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    if (movie.genre) {
      movie.genre = await Genre.findById(movie.genre);
    }
    movie.screenwrite = await personUtil.directionOrScreenwrite(
      movie.screenwrite
    );
    movie.direction = await personUtil.directionOrScreenwrite(movie.direction);
    movie.cast = await personUtil.cast(movie.cast);

    res.status(HttpStatus.StatusCodes.OK).json(movie);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }

    const newMovie = await Movie.findByIdAndUpdate(id, data, { new: true });
    if (newMovie.genre) {
      newMovie.genre = await Genre.findById(newMovie.genre);
    }
    newMovie.screenwrite = await personUtil.directionOrScreenwrite(
      newMovie.screenwrite
    );
    newMovie.direction = await personUtil.directionOrScreenwrite(
      newMovie.direction
    );
    newMovie.cast = await personUtil.cast(newMovie.cast);
    res.status(HttpStatus.StatusCodes.OK).json(newMovie);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    await Movie.findByIdAndDelete(id);
    res
      .status(HttpStatus.StatusCodes.OK)
      .json({ message: `Movie with id ${id} has deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  save,
  listAll,
  getById,
  update,
  remove,
};
