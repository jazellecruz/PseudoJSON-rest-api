const ApiResponse = require("../classes/apiResponse");
const ErrorMessage = require("../classes/error");
const Quote = require("../models/quote");
const { stringify, checkIfProcessed } = require("../helpers/helpers")
const { options } = require("../constants/constants")

// get all quotes w/ or w/o query
const getQuotes = async(query) => {
    let response;
    let limit = query.pageSize || 20;
    let page = query.page - 1 || 0;

    try{
      let result = await Quote.find(query, options)
          .limit(limit)
          .skip(limit * page)
          .sort({id : 1});

      let totalCountDocs = await Quote.countDocuments(query)

      if(!result.length || !Array.isArray(result)) {
        response = new ErrorMessage(
          `Resource with conditions: ${stringify(query)} does not exist.`,
          error = "Resources Not Found.",
          code = 404)
      } else {
        response = new ApiResponse(result, 
                  "quotes", 
                  totalCountDocs, 
                  page = query.page, 
                  // directly get page num from url to avoid unnecessary incrementation in class
                  limit = limit);
         
      }

    } catch(err) {
      response = new ErrorMessage("An Error occured while fetching data.", error = stringify(err.message))
    }

    return response;
}

// get quote with a specified id
const getQuoteById = async(id) => {
  let response;

  try{
    let result = await Quote.find({ id : id }, options);

    if(!result.length || !Array.isArray(result)) {
      response = new ErrorMessage(
        `Resource with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = result;
    }

   } catch(err) {
    response = new ErrorMessage("An Error occured while fetching data.", error = stringify(err.message))
   }

   return response
}

// add a new quote 
const postQuote = async(entry) => {
  let response;
  let { id, author, quote, category } = await entry
  
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

// modify a quote
const modifyQuote = async(id, entry) => {
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
// Note: "id" MUST NOT and CANNOT be replaced
const replaceQuote = async(id, entry) => {
  let response;
  let quoteId = id;
  let { author, quote, category } = entry;

  try {
    let result = await Quote.replaceOne({ id : quoteId },
      {
        id : id,
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

// deleting a quote 
const deleteQuote = async(id) => {
  let response;
  
  try {
    let result = await Quote.deleteOne({ id : id });
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "delete")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing deletion.", error = stringify(err.message))
  }

  return response;
}


module.exports = { getQuotes, getQuoteById, postQuote, modifyQuote, replaceQuote, deleteQuote }

