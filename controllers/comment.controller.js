const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const user = res.locals.user;

    if (!comment) {
      return res
        .status(412)
        .json({ errorMessage: '댓글 내용을 입력해 주세요' });
    }

    try {
      await this.commentService.createComment(comment, user, postId);

      return res
        .status(201)
        .json({ message: '댓글이 작성 되었습니다.', result: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errorMessage: '댓글 작성에 실패했습니다.', result: false });
    }
  };

  findComment = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const comments = await this.commentService.findComment(postId);

      return res.status(201).json({ result: comments });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errorMessage: '댓글 조회에 실패했습니다.', result: false });
    }
  };

  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const user = res.locals.user;

    try {
      await this.commentService.updateComment(commentId, user, comment);

      return res
        .status(201)
        .json({ message: '댓글이 수정 되었습니다.', result: true });
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .json({ errorMessage: '댓글 수정에 실패했습니다.', result: false });
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;

    try {
      await this.commentService.deleteComment(commentId);
      return res
        .status(201)
        .json({ message: '댓글이 삭제 되었습니다.', result: true });
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .json({ errorMessage: '댓글 삭제에 실패했습니다.', result: false });
    }
  };
}

module.exports = CommentController;
