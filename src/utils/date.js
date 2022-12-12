const careerYears = (careerStartDate) => {
    const diff = Math.abs(new Date().getTime() - careerStartDate.getTime())
    return Math.ceil(diff / (1000 * 3600 * 24) / 365) - 1
}

const age = (birthDate) => {
    const diff = Math.abs(new Date().getTime() - birthDate.getTime())
    return Math.ceil(diff / (1000 * 3600 * 24) / 365) - 1
}

module.exports = {
    careerYears,
    age
}