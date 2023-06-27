const Quote = require("../models/quote");
const ApiResponse = require("../classes/apiResponse");
const {ClientError, ServerError} = require("../classes/error");
const { stringify, isArrayOrString } = require("../helpers/helpers")
const { options } = require("../constants/constants")

// get all quotes w/ or w/o query
const getQuotes = async(query) => {
  try{
    let limit = query.pageSize || 20;
    let page = query.page - 1 || 0;

    let result = await Quote.find(query, options)
    .limit(limit)
    .skip(limit * page)
    .sort({id : 1});

    let totalCountDocs = await Quote.countDocuments(query);

    if(!result.length) {
      throw new ClientError(
        null, 
        404, 
        `Quotes with conditions: ${stringify(query)} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = new ApiResponse(
      result, 
      "quotes", 
      totalCountDocs, 
      page = query.page,
      limit = limit
    );

    return response;
  } catch(err) {
    console.log(err);

    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// get quote with a specified id
const getQuoteById = async(id) => {
  try{
    let result = await Quote.find({ id : id }, options);

    if(!result.length) {
      throw new ClientError(
        null, 
        404,
        `Quote with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    return result[0];
  } catch(err) {
    console.log(err);

    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// add a new quote 
const addQuote = async(entry) => {
  try{
    let { id, author, quote, category } = entry

    let newQuote = {
      id: id,
      author: author,
      quote: quote,
      // if the user only passed a string, isArrayOrString prevents the string from spreading
      // and returns it as an array instead 
      category: isArrayOrString(category)
    }

    let response = {
      quote: newQuote,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    console.log(err)

    throw new ServerError(err);
  }
}

// modify a quote
const modifyQuote = async(id, entry) => {
  try{
    let { author, quote, category } = entry

    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404,
        `Quote with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let modifiedQuote = {
      id: id,
      author: author || result[0].author,
      quote: quote || result[0].quote,
      category: isArrayOrString(category) || result[0].category
    }

    let response ={
      quote: modifiedQuote,
      isModified: true,
      modifiedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    console.log(err);

    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// replace a whole document
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replaceQuote = async(id, entry) => {
  try{
    let { author, quote, category } = entry

    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404,
        `Quote with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    }

    let modifiedQuote = {
      id: id,
      author: author,
      quote: quote,
      category: isArrayOrString(category)
    }

    let response = {
      quote: modifiedQuote,
      isReplaced: true,
      replacedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    console.log(err);

    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
    }
}

// deleting a quote 
const deleteQuote = async(id) => {
  try {
    let result = await Quote.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404,
        `Quote with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = {
      quote: result[0],
      isDeleted: true,
      deletedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    console.log(err);

    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}


module.exports = { getQuotes, getQuoteById, addQuote, modifyQuote, replaceQuote, deleteQuote }

