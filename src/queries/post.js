
const Post = require("../models/post");
const { options } = require("../constants/constants")
const ApiResponse = require("../classes/apiResponse")
const { stringify, checkIfProcessed } = require("../helpers/helpers");
const ErrorMessage = require("../classes/error");

//get all posts 
const getPosts = async(query) => {
  let response;
  let limit = query.pageSize || 20;
  let page = query.page - 1 || 0;

  try {
    let result = await Post.find(query, options)
        .limit(limit)
        .skip(limit * page)
        .sort({id : 1});

    let totalCountDocs = await Post.countDocuments(query)

    if (!result.length) {
      response = new ErrorMessage(
        `Posts with conditions: ${stringify(query)} does not exist.`,
        error = "Resources Not Found.",
        code = 404)
    } else {
      response = new ApiResponse(result, 
                  "posts", 
                  totalCountDocs, 
                  page = query.page, 
                  limit = limit)
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// get post by id
const getPostById = async(id) => {
  let response;

  try {
    let result = await Post.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `Post with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      response = result
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }
  return response
}

// add a new post 
const addPost = async(post) => {
  // make a new object with the body sent by the user then return 
  // it as a normal response
}

// modify a post 
const modifyPost = async(id, post) => {
  // find the resource by its id then make a new object
  // modifying it with the field/s sent by the user
  // then return it as a response
}

// replace a post 
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replacePost = async(id, post) => {
  // make a new object with the fields sent by the user but
  // the id will remain the same
}

const deletePost = async(id) => {
    // find the resource by its id then return it
    // along with isDeleted and date of deletion keys as a response
}

module.exports = { getPosts, getPostById, addPost, modifyPost, replacePost, deletePost }