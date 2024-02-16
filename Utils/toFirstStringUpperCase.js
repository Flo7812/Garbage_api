
function  toFirstStrUppC(x){
    const word = x.toLowerCase()
    const result = word.charAt(0).toUpperCase() + word.slice(1)
    return result
} 

module.exports = toFirstStrUppC