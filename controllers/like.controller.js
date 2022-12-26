const LikeService = require('../services/like.service');
const PostService = require('../services/post.service');
class LikeController {
  likeService = new LikeService();
  postService = new PostService();
  likePost = async (req, res) => {
    const { postId } = req.params;
    const user = res.locals.user;

    try {
      const result = await this.likeService.createLike(postId, user);
      if (result.data === 0) {
        await this.postService.deletelike(postId);
        return res
          .status(200)
          .json({ message: '좋아요가 삭제 되었습니다.', result: true });
      } else {
        await this.postService.createlike(postId);
        return res
          .status(200)
          .json({ message: '좋아요가 추가 되었습니다.', result: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: '알 수 없는 오류 발생' });
    }
  };
}
module.exports = LikeController;
