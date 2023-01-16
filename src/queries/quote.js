const ApiResponse = require("../classes/apiResponse");
const ErrorMessage = require("../classes/error");
const Quote = require("../models/quote");
const { stringify, isArrayOrString } = require("../helpers/helpers")
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
          `Quotes with conditions: ${stringify(query)} does not exist.`,
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
        `Quote with id: ${id} does not exist.`,
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
const addQuote = async(entry) => {
  let response;
  let { id, author, quote, category } = entry
 
  try{
    let newQuote = {
      id: id,
      author: author,
      quote: quote,
      // if the user only passed a string, isArrayOrString prevents the string from spreading
      // and returns it as an array instead 
      category: isArrayOrString(category)
    }
    response = {
      quote: newQuote,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// modify a quote
const modifyQuote = async(id, entry) => {
  let response;
  let { author, quote, category } = entry
  try{
    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `Quote with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      let modifiedQuote = {
        id: id,
        author: author || result[0].author,
        quote: quote || result[0].quote,
        category: isArrayOrString(category) || result[0].category
      }

      response ={
        quote: modifiedQuote,
        isModified: true,
        modifiedOn: new Date().toUTCString()
      }
    }
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a whole document
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replaceQuote = async(id, entry) => {
  let response;
  let { author, quote, category } = entry
  try{
    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `Quote with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      let modifiedQuote = {
        id: id,
        author: author,
        quote: quote,
        category: isArrayOrString(category)
      }

      response ={
        quote: modifiedQuote,
        isReplaced: true,
        replacedOn: new Date().toUTCString()
      }
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// deleting a quote 
const deleteQuote = async(id) => {
  let response;

  try {
    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `Quote with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = {
        quote: result,
        isDeleted: true,
        deletedOn: new Date().toUTCString()
      }
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}


module.exports = { getQuotes, getQuoteById, addQuote, modifyQuote, replaceQuote, deleteQuote }

