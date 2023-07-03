const Post = require("../models/post");
const { options } = require("../constants/constants");
const ApiResponse = require("../classes/apiResponse");
const { stringify } = require("../helpers/helpers");
const {ClientError, ServerError} = require("../classes/error");

//get all posts 
const getPosts = async(query) => {
  try {
    let limit = query.pageSize || 20;
    let page = query.page - 1 || 0;

    let result = await Post.find(query, options)
        .limit(limit)
        .skip(limit * page)
        .sort({id : 1});

    let totalCountDocs = await Post.countDocuments(query);

    if (!result.length) {
      throw new ClientError(
        null ,
        404, 
        `Posts with conditions: ${stringify(query)} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = new ApiResponse(
      result, 
      "posts", 
      totalCountDocs, 
      page = query.page, 
      limit = limit
    );

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// get post by id
const getPostById = async(id) => {
  try{

    let result = await Post.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404, 
        `Post with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    } 

    let response = result[0];

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// add a new post 
const addPost = async(post) => {
  try{
    let { id, title, body } = post;

    let newPost = {
      id: id,
      title: title,
      body: body
    }

    let response = {
      post: newPost,
      isAdded: true,
      addedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }

}

// modify a post 
const modifyPost = async(id, post) => {
  try{
    let { title, body } = post

    let result = await Post.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404, 
        `Post with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
      );
    }
    
    let modifiedPost = {
      id: id,
      title: title || result[0].title,
      body: body || result[0].title
    }

    let response ={
      post: modifiedPost,
      isModified: true,
      modifiedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}

// replace a post 
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replacePost = async(id, post) => {
  try{
    let { title, body } = post;

    let replacedPost = {
      id: id,
      title: title,
      body: body
    }

    let response = {
      post : replacedPost,
      isReplaced: true,
      replacedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    throw new ServerError(err);
  }


}

const deletePost = async(id) => {
  try {
    let result = await Post.find({ id : id }, options);

    if (!result.length) {
      throw new ClientError(
        null, 
        404, 
        `Post with id: ${id} does not exist.`, 
        "Resource Not Found: No resource found matching the provided criteria."
        );
    } 
    
    let response = {
      post: result[0],
      isDeleted: true,
      deletedOn: new Date().toUTCString()
    }

    return response;
  } catch(err) {
    if(err instanceof ClientError){
      throw err;
    }  

    throw new ServerError(err);
  }
}


module.exports = { getPosts, getPostById, addPost, modifyPost, replacePost, deletePost }
