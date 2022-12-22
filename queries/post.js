
const Post = require("../models/post");

//get all posts 
const getPosts = async(query) => {
  let response;
  let limit = query.pageSize;
  let page = query.page - 1;

  try {
    let result = await Post.find(query, {"_id" : false, "__v" : false })
                    .limit(limit)
                    .skip(limit * page)
                    .sort({ id : 1 })

    if (!result.length) {
      response = "No posts found."
    } else {
      response = result
    }

  } catch(error) {
    response = error
  }

  return response
}

// get post by id
const getPostById = async(id) => {
  let response;

  try {
    let result = await Post.find({ id : id }, {"_id" : false, "__v" : false });

    if (!result.length) {
      response = "No post found"
    } else {
      response = result
    }

  } catch(error) {

  }
  return response
}

module.exports = { getPosts, getPostById }