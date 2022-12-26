const PostService = require('../services/post.service');
const CommentService = require('../services/comment.service');
const PostlikeService = require('../services/like.service');
const {
  NotFoundError,
  ValidationError,
  AuthorizationError,
  UnknownError,
} = require('../exceptions/index.exception');
class PostController {
  postService = new PostService();
  commentService = new CommentService();
  postlikeService = new PostlikeService();

  createPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { content } = req.body;
      const fileName = req.file.location;

      await this.postService.createPost(userId, content, fileName);
      return res
        .status(201)
        .json({ message: '게시글이 추가되었습니다.', result: true });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  findAllPosts = async (req, res) => {
    try {
      const posts = await this.postService.findAllPosts();

      console.log(posts);
      return res.status(200).json({ posts });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  findProfilePosts = async (req, res) => {
    try {
      const { nickname } = req.params;
      const { userId } = res.locals.user;

      const userInfo = await this.postService.findUser(userId);

      if (nickname !== userInfo.nickname)
        throw new AuthorizationError('본인의 프로필이 아닙니다');

      const posts = await this.postService.findProfilePosts(userId);
      console.log(posts);
      return res.status(200).json({ posts });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  findDetailPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const postInfo = await this.postService.findDetailPost(postId);
      const commentInfo = await this.commentService.findComment(postId);
      const postlikeInfo = await this.postlikeService.likefind(postId, userId);

      if (!postInfo) throw new NotFoundError('없는 게시글입니다.');

      if (!postlikeInfo) {
        postInfo[0].postlike = false;
      } else {
        postInfo[0].postlike = true;
      }

      postInfo[0].comments = commentInfo;

      return res.status(200).json({ postInfo });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { content } = req.body;

      const postInfo = await this.postService.findDetailPost(postId);

      console.log(res.locals.user);
      if (!postInfo) throw new NotFoundError('없는 게시글입니다.');
      if (userId !== postInfo[0].userId)
        throw new AuthorizationError('본인의 게시글이 아닙니다');

      await this.postService.updatePost(postId, content);

      return res
        .status(201)
        .json({ message: '게시글 수정에 성공했습니다.', result: true });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      const postInfo = await this.postService.findDetailPost(postId);

      if (!postInfo) throw new NotFoundError('없는 게시글입니다.');
      if (userId !== postInfo[0].userId)
        throw new AuthorizationError('본인의 게시글이 아닙니다');

      await this.postService.deletePost(postId);

      return res
        .status(201)
        .json({ message: '게시글 수정에 삭제했습니다.', result: true });
    } catch (error) {
      res.status(error.status).json({
        errorMessage: error.message,
        result: false,
      });
    }
  };
}

module.exports = PostController;
