class LikeRepository {
  constructor(PostLikesModel) {
    this.postLikesModel = PostLikesModel;
  }

  findOneLike = async (postId) => {
    const findOneLike = await this.postLikesModel.findOne({
      where: { postId },
    });
    return findOneLike;
  };

  createPostLike = async (postId, user) => {
    const createPostLike = await this.postLikesModel.create({
      postId,
      userId: user.userId,
    });
    return createPostLike;
  };

  deletePostLike = async (postId, user) => {
    const deletePostLike = await this.postLikesModel.destroy({
      where: { postId, userId: user.userId },
    });
    return deletePostLike;
  };
}

module.exports = LikeRepository;
