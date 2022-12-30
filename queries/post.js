
const Post = require("../models/post");
const { options } = require("../constants/constants")
const ApiResponse = require("../classes/apiResponse")
const { stringify, checkIfProcessed } = require("../helpers/helpers");
const ErrorMessage = require("../classes/error");

//get all posts 
const getPosts = async(query) => {
  let response;
  let limit = query.pageSize;
  let page = query.page - 1;

  try {
    let result = await Post.find(query, options)
                    .limit(limit || 20)
                    .skip(limit * page || 0)

    if (!result.length) {
      response = new ErrorMessage(
        `Resource with conditions: ${stringify(query)} does not exist.`,
        error = "Resources Not Found.",
        code = 404)
    } else {
      response = new ApiResponse(result, "posts", query.page ,limit)
    }

  } catch(err) {
    response = err
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
        `Resource with id: ${id} does not exist.`,
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
  let response
  let { id, title, body } = post

  let newPost = new Post({
    id: id,
    title: title,
    body: body
  })

  await newPost.save()
  .then(res => response = res)
  .catch(err => response = err)

  return response
}

// modify a post 
const modifyPost = async(id, post) => {
  let response

  try {
    let result = await Post.updateOne({ id : id }, { $set : post })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "update/modify")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.")
  }

  return response
}

// replace a post 
// NOTE: the "id" MUST NOT and CANNOT be replaced
const replacePost = async(id, post) => {
  let response
  let { title, body } = post

  try {
    let result = await Post.replaceOne({ id: id }, {
      id: id,
      title: title,
      body: body
    })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "replace")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

const deletePost = async(id) => {
  let response 

  try {
    let result = await Post.deleteOne({ id : id })
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "delete")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }
  return response
}

module.exports = { getPosts, getPostById, addPost, modifyPost, replacePost, deletePost }