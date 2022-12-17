
const stringify = (entry) => {
let string = JSON.stringify(entry)
string =  string.split('"').join(' ')
return string
}

module.exports = { stringify }