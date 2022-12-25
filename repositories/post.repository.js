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
    const query = `SELECT Posts.postId,Posts.userId,image,content,profileImg, IFNULL(commentsCount,0) as commentsCount
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
    return await this.postModel.findByPk(postId);
  };

  updatePost = async (postId, content) => {
    await this.postModel.update({ content }, { where: { postId } });
  };
  deletePost = async (postId) => {
    await this.postModel.destroy({ where: { postId } });
  };
}

module.exports = PostRepository;
