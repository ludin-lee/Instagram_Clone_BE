const LikeRepository = require('../repositories/like.repository');
const { Postlikes } = require('../models');

class LikeService {
  likeRepository = new LikeRepository(Postlikes);

  createLike = async (postId, user) => {
    const postLike = await this.likeRepository.findOneLike(postId);

    if (postLike === null) {
      this.likeRepository.createPostLike(postId, user);
      return { data: 1 };
    } else if (postLike.userId === user.userId) {
      this.likeRepository.deletePostLike(postId, user);
      return { data: 0 };
    } else {
      this.likeRepository.createPostLike(postId, user);
      return { data: 1 };
    }
  };
}

module.exports = LikeService;
