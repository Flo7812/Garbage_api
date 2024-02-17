const toFirstStrUppC = require('./toFirstStringUpperCase')

const makeUsername = (lastName,firstName,id ) => {
    const ln = toFirstStrUppC(lastName)
    const username = firstName.charAt(0).toUpperCase() + ln + id
    return username
}
module.exports = makeUsername

