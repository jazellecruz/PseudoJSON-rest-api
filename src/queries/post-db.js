const Post = require("../models/post");
const ErrorMessage = require("../classes/error");
const { stringify, checkIfProcessed } = require("../helpers/helpers");

// functions for modyfing the actual database

// add new user
const addPostOnDb = async(post) => {
  let response;
  let { id, title, body } = post

  let newPost = new Post({
    id: id,
    title: title,
    body: body
  })

  await newPost.save()
  .then(res => response = res)
  .catch(err => response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message)))

  return response
}

// modify a single user
const modifyPostFromDb = async(id, post) => {
  let response

  try {
    let result = await Post.updateOne({ id : id }, { $set : post })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "PATCH")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

// replace a post 
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replacePostFromDb = async(id, post) => {
  let response
  let postId = id
  let { newId, title, body } = post

  try {
    let result = await Post.replaceOne({ id: postId }, {
      id: newId,
      title: title,
      body: body
    })
    response = checkIfProcessed(result.acknowledged, result.modifiedCount, "PUT")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }

  return response
}

//delete a single user
const deletePostFromDb = async(id) => {
  let response 

  try {
    let result = await Post.deleteOne({ id : id })
    response = checkIfProcessed(result.acknowledged, result.deletedCount, "DELETE")
  } catch(err) {
    response = new ErrorMessage("An error occured while performing request.", error = stringify(err.message))
  }
  return response
}

module.exports = { addPostOnDb, modifyPostFromDb, replacePostFromDb, deletePostFromDb }