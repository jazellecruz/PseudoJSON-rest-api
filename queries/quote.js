const QuotesResponse = require("../classes/quote");
const ErrorMessage = require("../classes/error");
const Quote = require("../models/quotesModel");

// get all quotes w/ or w/o query
const getQuotes = async(query) => {
    let response;
    
    try{
      let result = await Quote.find(query, {"_id" : false, "__v" : false });

      if(!result.length || !Array.isArray(result)) {
        response = new ErrorMessage(`Resource with conditions: ${query} does not exist.`)
      } else {
        response = new QuotesResponse(result);
      }

    } catch(err) {
      response = new ErrorMessage("An Error occured while fetching data.", err)
    }

    return response;
}

// get quote with specified id
const getQuoteById = async(id) => {
  let response;

  try{
    let result = await Quote.find({ id : id }, {"_id" : false, "__v" : false });

    if(!result.length || !Array.isArray(result)) {
      response = new ErrorMessage(`Resource with id: ${id} does not exist.`)
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

  let newQuote = await new Quote({
    id: id,
    author: author,
    quote: quote,
    category: category,
  });

  await newQuote.save()
  .then(res => response = new QuotesResponse(res) )
  .catch(err => response = new ErrorMessage("An Error occured while posting data.", err))

  return response;
}

// modify a quote
const modifyQuote = async(id, entry) => {
  let response;
  try {
    let result = await Quote.updateOne({ id : id }, { $set : entry })
    response = result
  } catch(err) {
    response = new ErrorMessage("An Error occured while performing request.", err)
  }
 
  return response;
}


module.exports = { getQuotes, getQuoteById, postQuote, modifyQuote }

