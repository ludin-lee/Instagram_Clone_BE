class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (comment, user, postId) => {
    const createComment = await this.commentsModel.create({
      comment,
      userId: user.userId,
      postId,
    });
    return createComment;
  };

  findAllComment = async (postId) => {
    const findAllComment = await this.commentsModel.findAll({
      where: postId,
    });
    return findAllComment;
  };

  findPostComment = async (postId) => {
    const findPostComment = await this.commentsModel.findOne({
      where: { postId },
    });
    return findPostComment;
  };

  findOneComment = async (commentId) => {
    const findOneComment = await this.commentsModel.findOne({
      where: { commentId },
    });
    return findOneComment;
  };

  updateComment = async (commentId, comment) => {
    const updateComment = await this.commentsModel.update(
      { comment },
      { where: { commentId } },
    );

    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await this.commentsModel.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}

module.exports = CommentRepository;
