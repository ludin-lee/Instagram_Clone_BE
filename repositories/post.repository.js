const { Posts, Comments, PostLikes, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class PostRepository {
  constructor(PostModel) {
    this.postModel = PostModel;
  }

  createPost = async (userId, content, fileName) => {
    await this.postModel.create({ userId, content, image: fileName });
  };

  findAllPosts = async () => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,image,content,profileImg,likeCount,IFNULL(commentsCount,0) as commentsCount
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId`;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  findProfilePosts = async (userId) => {
    return await this.postModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['postId', 'image', 'createdAt'],
    });
  };

  findDetailPost = async (postId) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,image,content,likeCount,Users.profileImg
    FROM Posts LEFT JOIN Users
    On Posts.userId = Users.userId
    WHERE Posts.postId = ${postId}
    `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  updatePost = async (postId, content) => {
    await this.postModel.update({ content }, { where: { postId } });
  };
  deletePost = async (postId) => {
    await this.postModel.destroy({ where: { postId } });
  };

  deletelike = async (postId) => {
    await this.postModel.decrement({ likeCount: 1 }, { where: { postId } });
  };

  createlike = async (postId) => {
    await this.postModel.increment({ likeCount: 1 }, { where: { postId } });
  };
}

module.exports = PostRepository;
