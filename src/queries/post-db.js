const Post = require("../models/post");
const {ErrorMessage, APIError} = require("../classes/error");
const { stringify, checkIfProcessed } = require("../helpers/helpers");

// functions for modyfing the actual database

// add new user
const addPostOnDb = async(post) => {
  try{
    let { id, title, body } = post;

    let newPost = new Post({
      id: id,
      title: title,
      body: body
    });

    let response = await newPost.save();
    return response;
  } catch(err){
    throw (new APIError(500, "An error occured while performing request.", err));
  }
 
}

// modify a single user
const modifyPostFromDb = async(id, post) => {
  try{
    let result = await Post.updateOne({ id : id }, { $set : post });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw (new APIError(500, "An error occured while performing request.", err));
  }
}

// replace a post 
// NOTE: I DO NOT ADVISE TO REPLACE A WHOLE DOCUMENT
// I SUGGEST TO CREATE A NEW ONE INSTEAD TO AVOID DUPLICATION OF ID
const replacePostFromDb = async(id, post) => {
  try {
    let postId = id
    let { newId, title, body } = post
    
    let result = await Post.replaceOne({ id: postId }, {
      id: newId,
      title: title,
      body: body
    });

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.modifiedCount,
      modifiedCount: result.modifiedCount,
    }

    return response;
  } catch(err) {
    throw (new APIError(500, "An error occured while performing request.", err));
  }

}

//delete a single user
const deletePostFromDb = async(id) => {
  try {
    let result = await Post.deleteOne({ id : id })

    let response = {
      isAcknowledged: !!result.acknowledged,
      isSuccessful: !!result.deletedCount,
      deletedCount: result.deletedCount,
    }

    return response;
  } catch(err) {
    throw (new APIError(500, "An error occured while performing request.", err));
  }
}

module.exports = { addPostOnDb, modifyPostFromDb, replacePostFromDb, deletePostFromDb }