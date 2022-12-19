const QuotesResponse = require("../classes/quote");
const ErrorMessage = require("../classes/error");
const Quote = require("../models/quotesModel");
const helpers = require("../helpers/helpers")

// get all quotes w/ or w/o query
const getQuotes = async(query) => {
    let response;
    let limit = query.pageSize;
    let page = query.page - 1;

    try{
      let result = await Quote.find(query, {"_id" : false, "__v" : false })
          .limit(limit)
          .skip(limit * page)
          .sort({id : 1});

      if(!result.length || !Array.isArray(result)) {
        response = new ErrorMessage(
          `Resource with conditions: ${helpers.stringify(query)} does not exist.`,
          error = "Resources Not Found.",
          code = 404)
      } else {
        response = new QuotesResponse(result, page = query.page, limit = limit);
          // directly get page num from url to avoid unnecessary incrementation in class
      }

    } catch(err) {
      response = new ErrorMessage("An Error occured while fetching data.", error = err)
    }

    return response;
}

// get quote with a specified id
const getQuoteById = async(id) => {
  let response;

  try{
    let result = await Quote.find({ id : id }, {"_id" : false, "__v" : false });

    if(!result.length || !Array.isArray(result)) {
      response = new ErrorMessage(
        `Resource with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = new QuotesResponse(result);
    }

   } catch(err) {
    response = new ErrorMessage("An Error occured while fetching data.", err)
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
  .then(res => response = new QuotesResponse(res))
  .catch(err => response = new ErrorMessage("An Error occured while posting data.", err))

  return response;
}

// modify a quote
const modifyQuote = async(id, entry) => {
  let response;
  try {
    let result = await Quote.updateOne({ id : id }, { $set : entry })
    if (result.acknowledged) {
      if (!result.modifiedCount) {
        response = new ErrorMessage("Request is acknowledged but no document is modified.")
      } 
      response = `Document with id: ${id} is successfully modified!`
    }
  } catch(err) {
    response = new ErrorMessage("An Error occured while performing request.", err)
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
      if (result.acknowledged) {
        if (!result.modifiedCount) {
          response = new ErrorMessage("Request is acknowledged but no document is replaced.")
        } 
        response = "Document is successfully replaced!"
      }
  } catch(err) {
    response = new ErrorMessage("An Error occured while performing request.", err)
  }
 
  return response;
}

// deleting a quote 
const deleteQuote = async(id) => {
  let response;
  try {
    let result = await Quote.deleteOne({ id : id });

    if (result.acknowledged && result.deletedCount) {
      response = `Document with id: ${id} is successfully deleted!`
    } else {
      response = new ErrorMessage("Request is acknowledged but no document is deleted.")
    }

  } catch(err) {
    console.log(err)
    response = new ErrorMessage("An error occured while performing deletion.", err)
  }

  return response;
}


module.exports = { getQuotes, getQuoteById, postQuote, modifyQuote, replaceQuote, deleteQuote }

