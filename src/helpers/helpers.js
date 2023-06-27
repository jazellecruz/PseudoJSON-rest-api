
const stringify = (entry) => {
  let string = JSON.stringify(entry)
  string =  string.split('"').join(' ').split('\\').join('')

  return string
}

const isArrayOrString = (data) => {
  if(typeof data === "string") {
    return [data]
  } else if (Array.isArray(data)){
    return [...data]
  } else if(!data){
    return undefined;
  } else {
    throw new Error(`Entered value is: ${typeof data}, not a string nor an array!`)
  }
}

const sanitizeInput = (input) => {
  if(typeof input === "number") return input;

  let illegalCharacters = {
    "<": "&lt;", 
    ">": "&gt;",
    "=": "&#61;"
  }

  try{
    let sanitizedInput = [];
    let inputToSanitize = input.trim()
    
    for(const char of inputToSanitize){
      if(char === "<" || char === ">" || char === "=") {
        sanitizedInput.push(illegalCharacters[char])
      } else {
        sanitizedInput.push(char)
      }
    }

    return sanitizedInput.join('');

  } catch(err) {
    console.log("Error in sanitizing input:", err)
  }

}

module.exports = { stringify, isArrayOrString, sanitizeInput }