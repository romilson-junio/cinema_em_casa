const Cine = require('../models/cine.model')
const Movie = require('../models/movie.model')
const HttpStatus = require('http-status-codes')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newCine = new Cine(data)
        const savedCine = await newCine.save()
        if(!savedCine) {
            throw new Error('Cine cold not be saved')
        }
        res.status(HttpStatus.StatusCodes.CREATED).json({ message: 'New Cine created' })
    } catch(err) {
        next(err)
    }
}

const listAll = async (req, res, next) => {
    try {
        const cines = await Cine.find()
        for(let cine of cines){
            let movies = []
            for(let m of cine.moviesTheaters){
                let movie = await Movie.findById(m)
                if(movie){
                    movies.push( movie )
                }
            }
            cine.moviesTheaters = movies 
        }
        res.status(HttpStatus.StatusCodes.OK).json(cines)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const cine = await Cine.findById(id)
        if(!cine) {
            throw new Error(`Cine with id ${id} not found`)
        }
        let movies = []
        for(let m of cine.moviesTheaters){
            let movie = await Movie.findById(m)
            if(movie){
                movies.push( movie )
            }
        }
        cine.moviesTheaters = movies
        res.status(HttpStatus.StatusCodes.OK).json(cine)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const cine = await Cine.findById(id)
        if(!cine) {
            throw new Error(`Cine with id ${id} not found`)
        }

        const newCine = await Cine.findByIdAndUpdate(id, data, {new: true})
        res.status(HttpStatus.StatusCodes.OK).json(newCine)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const cine = await Cine.findById(id)
        if(!cine) {
            throw new Error(`Cine with id ${id} not found`)
        }
        await Cine.findByIdAndDelete(id)
        res.status(HttpStatus.StatusCodes.OK).json({message: `Cine with id ${id} has deleted`})
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

