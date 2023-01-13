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
  // make a new object with the body sent by the user then return 
  // it as a normal response
}

// modify a quote
const modifyQuote = async(id, entry) => {
  // find the resource by its id then make a new object
  // modifying it with the field/s sent by the user
  // then return it as a response
}

// replace a whole document
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replaceQuote = async(id, entry) => {
  // make a new object with the fields sent by the user but
  // the id will remain the same  
}

// deleting a quote 
const deleteQuote = async(id) => {
  // find the resource by its id then return it
  // along with isDeleted and date of deletion keys as a response  
}


module.exports = { getQuotes, getQuoteById, addQuote, modifyQuote, replaceQuote, deleteQuote }

