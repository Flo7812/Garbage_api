
function makeKeyNumber(birth, phone){
    const key = birth.charAt(birth.length - 1)+ phone.charAt(phone.length - 1)
    return key
}

module.exports = makeKeyNumber
