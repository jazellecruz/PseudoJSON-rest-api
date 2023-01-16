
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
  let response;
  let { id, title, body } = post
 
  try{
    newPost = {
      id: id,
      title: title,
      body: body
    }
    response = {
      post: newPost,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }
  }catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// modify a post 
const modifyPost = async(id, post) => {
  let response;
  let { title, body } = post
  try{
    let result = await Post.find({ id : id }, options);

    if (!result.length) {
      response = new ErrorMessage(
        `Post with id: ${id} does not exist.`,
        error = "Resources Not Found.",
        code = 404
        )
    } else {
      let modifiedPost = {
        id: id,
        title: title || result[0].title,
        body: body || result[0].title
      }

      response ={
        post: modifiedPost,
        isModified: true,
        modifiedOn: new Date().toUTCString()
      }
    }
  }catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a post 
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replacePost = async(id, post) => {
  let response;
  let { title, body } = post
  
  try{
    let replacedPost = {
      id: id,
      title: title,
      body: body
    }
    response = {
      post : replacedPost,
      isReplaced: true,
      replacedOn: new Date().toUTCString()
    }
  }catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

const deletePost = async(id) => {
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
      response = {
        post: result,
        isDeleted: true,
        deletedOn: new Date().toUTCString()
      }
    }

  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}


module.exports = { getPosts, getPostById, addPost, modifyPost, replacePost, deletePost }