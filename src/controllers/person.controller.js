const Person = require("../models/person.model");
const HttpStatus = require("http-status-codes");
const messages = require("../utils/bundle");
const calcDate = require("../utils/date");

const save = async (req, res, next) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    if (!savedPerson) {
      throw new Error({ message: messages.personNotSave });
    }
    savedPerson.careerYears = calcDate.careerYears(savedPerson.careerStartDate);
    savedPerson.age = calcDate.age(savedPerson.birthDate);
    res
      .status(HttpStatus.StatusCodes.CREATED)
      .json({ message: messages.personCreated });
  } catch (err) {
    next(err);
  }
};

const listAll = async (req, res, next) => {
  try {
    const persons = await Person.find();
    for (let person of persons) {
      person.careerYears = calcDate.careerYears(person.careerStartDate);
      person.age = calcDate.careerYears(person.birthDate);
    }
    res.status(HttpStatus.StatusCodes.OK).json(persons);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (!person) {
      throw new Error(`Person with id ${id} not found`);
    }
    person.careerYears = calcDate.careerYears(person.careerStartDate);
    person.age = calcDate.careerYears(person.birthDate);
    res.status(HttpStatus.StatusCodes.OK).json(person);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const person = await Person.findById(id);
    if (!person) {
      throw new Error(`Person with id ${id} not found`);
    }

    const newPerson = await Person.findByIdAndUpdate(id, data, { new: true });
    newPerson.careerYears = calcDate.careerYears(person.careerStartDate);
    newPerson.age = calcDate.careerYears(person.birthDate);
    res.status(HttpStatus.StatusCodes.OK).json(newPerson);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (!person) {
      throw new Error(`Person with id ${id} not found`);
    }
    await Person.findByIdAndDelete(id);
    res
      .status(HttpStatus.StatusCodes.OK)
      .json({ message: `Person with id ${id} has deleted` });
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
