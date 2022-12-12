const Genre = require('../models/genre.model')
const HttpStatus = require('http-status-codes')
const messages = require('../utils/bundle')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newGenre = new Genre(data)
        const savedGenre = await newGenre.save()
        if(!savedGenre) {
            throw new Error({ message: messages.genreNotSave })
        }
        res.status(HttpStatus.StatusCodes.CREATED).json({ message: messages.genreCreated })
    } catch(err) {
        next(err)
    }
}

const listAll = async (req, res, next) => {
    try {
        const genres = await Genre.find()
        res.status(HttpStatus.StatusCodes.OK).json(genres)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const genre = await Genre.findById(id)
        if(!genre) {
            throw new Error(`Genre with id ${id} not found`)
        }
        res.status(HttpStatus.StatusCodes.OK).json(genre)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const genre = await Genre.findById(id)
        if(!genre) {
            throw new Error(`Genre with id ${id} not found`)
        }

        const newGenre = await Genre.findByIdAndUpdate(id, data, {new: true})
        res.status(HttpStatus.StatusCodes.OK).json(newGenre)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const genre = await Genre.findById(id)
        if(!genre) {
            throw new Error(`Genre with id ${id} not found`)
        }
        await Genre.findByIdAndDelete(id)
        res.status(HttpStatus.StatusCodes.OK).json({message: `Genre with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    save,
    listAll,
    getById,
    update,
    remove
}