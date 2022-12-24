const CommentRepository = require('../repositories/comment.repository');
const PostRepository = require('../repositories/post.repository');
const { Comments, Posts } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository(Comments);
  postRepository = new PostRepository(Posts);

  createComment = async (comment, user, postId) => {
    if (!comment) {
      throw new ValidationError('comment 내용을 적어주세요.');
    }

    const post = this.postRepository.findOnePost(postId);
    if (!post) {
      throw new ValidationError('게시글이 없습니다.');
    }

    const createComment = await this.commentRepository.createComment(
      comment,
      user,
      postId,
    );
    console.log('createComment', createComment);

    return createComment;
  };

  findComment = async (postId) => {
    const comments = this.commentRepository.findPostComment(postId);
    return comments;
  };

  updateComment = async (commentId, user, comment) => {
    const isComment = await this.commentRepository.findOneComment(commentId);

    if (isComment.userId !== user.userId) {
      throw new ValidationError('댓글이 없습니다.');
    }

    if (comment === '') {
      throw new ValidationError('빈칸을 채워주세요');
    }

    const updateComment = await this.commentRepository.updateComment(
      commentId,
      comment,
    );

    if (updateComment.includes(0)) {
      throw new ValidationError('게시글이 없습니다.');
    }
    return updateComment;
  };

  deleteComment = async (commentId) => {
    const isComment = await this.commentRepository.findOneComment(commentId);
    if (!isComment) {
      throw new ValidationError('댓글이 없습니다.');
    }
    const result = await this.commentRepository.deleteComment(commentId);
    return result;
  };
}

module.exports = CommentService;
