const Quote = require("../models/quote");
const {ServerError} = require("../classes/error");
// functions for modyfing the actual database

// add new quote
const addQuoteOnDb = async(entry) => {
  try{
    let { id, author, quote, category } = entry
    
    let newQuote = new Quote({
      id: id,
      author: author,
      quote: quote,
      category: category,
    });
  
    let response = await newQuote.save();

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

// modify a single user
const modifyQuoteFromDb = async(id, entry) => {
  try{
    let result = await Quote.updateOne({ id : id }, { $set : entry });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }

}

// replace a whole document
// id cannot be replaced
const replaceQuoteFromDb = async(id, entry) => {
  try {
    let quoteId = id;
    let { author, quote, category } = entry;
    
    let result = await Quote.replaceOne({ id : quoteId },
      { id : quoteId,
        author: author,
        quote: quote,
        category: category });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

//delete a single user
const deleteQuoteFromDb = async(id) => {
  try{
    let result = await Quote.deleteOne({ id : id });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.deletedCount,
      deletedCount: result.deletedCount,
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }
}

module.exports = { addQuoteOnDb, modifyQuoteFromDb, replaceQuoteFromDb, deleteQuoteFromDb }