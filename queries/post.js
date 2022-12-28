
const Post = require("../models/post");
const { options } = require("../constants/constants")
const ApiResponse = require("../classes/apiResponse")

//get all posts 
const getPosts = async(query) => {
  let response;
  let limit = query.pageSize;
  let page = query.page - 1;

  try {
    let result = await Post.find(query, options)
                    .limit(limit)
                    .skip(limit * page)
                    .sort({ id : 1 })

    if (!result.length) {
      response = "No posts found."
    } else {
      response = new ApiResponse(result, "posts", query.page, limit)
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
      response = "No post found"
    } else {
      response = new ApiResponse(result, "posts", query.page, limit)
    }

  } catch(err) {

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
    response = result
  } catch(err) {
    response = err
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
    response = result
  } catch(err) {
    response = err
  }

  return response
}

const deletePost = async(id) => {
  let response 

  try {
    let result = await Post.deleteOne({ id : id })
    response = result
  } catch(err) {
    response = err
  }
  return response
}

module.exports = { getPosts, getPostById, addPost, modifyPost, replacePost, deletePost }