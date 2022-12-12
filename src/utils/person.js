const Person = require('../models/person.model')
const calcDate = require('./date')

const cast = async (personsCast) => {
    let persons = []
    for (let person of personsCast) {
        let p = await Person.findById(person)
        p.careerYears = calcDate.careerYears(p.careerStartDate)
        p.age = calcDate.age(p.birthDate)
        if(p) persons.push(p)
    }
    return persons
}

const directionOrScreenwrite = async (directionOrScreenwrite) => {
    let p = await Person.findById(directionOrScreenwrite)
    p.careerYears = calcDate.careerYears(p.careerStartDate)
    p.age = calcDate.age(p.birthDate)
    return p
}

module.exports = {
    cast,
    directionOrScreenwrite
}