const Quote = require("../models/quote");
const ErrorMessage = require("../classes/error");
const { stringify, checkIfProcessed } = require("../helpers/helpers")
// functions for modyfing the actual database

// add new user
const addQuoteOnDb = async(entry) => {
  let response;
  let { id, author, quote, category } = entry
  
  let newQuote = new Quote({
    id: id,
    author: author,
    quote: quote,
    category: category,
  });

  await newQuote.save()
  .then(res => response = new ApiResponse(res))
  .catch(err => response = new ErrorMessage("An Error occured while posting data.", error = stringify(err.message)))

  return response;
}

// modify a single user
const modifyQuoteFromDb = async(id, entry) => {
  let response;

  try {
    let result = await Quote.updateOne({ id : id }, { $set : entry })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "update/modify")
  } catch(err) {
    response = new ErrorMessage("An Error occured while performing request.", error = stringify(err.message))
  }
 
  return response;
}

// replace a whole document
const replaceQuoteFromDb = async(id, entry) => {
  let response;
  let quoteId = id;
  let { newId, author, quote, category } = entry;

  try {
    let result = await Quote.replaceOne({ id : quoteId },
      {
        id : newId,
        author: author,
        quote: quote,
        category: category,
      });
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "replace")

  } catch(err) {
    response = new ErrorMessage("An Error occured while performing request.", error = stringify(err.message))
  }
 
  return response;
}

//delete a single user
const deleteQuoteFromDb = async(id) => {
  let response;
  
  try {
    let result = await Quote.deleteOne({ id : id });
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "delete")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing deletion.", error = stringify(err.message))
  }

  return response;
}

module.exports = { addQuoteOnDb, modifyQuoteFromDb, replaceQuoteFromDb, deleteQuoteFromDb }