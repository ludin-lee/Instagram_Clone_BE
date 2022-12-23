const logger = require('../config/loggers');
const PostService = require('../services/post.service')

const multer = require('multer');
const upload = multer;

class PostController {
  postService = new PostService();
  createDiary = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { title, content, weather } = req.body;
      const fileName = req.file.location;
      console.log(fileName);
      await this.postService.createDiary(
        userId,
        title,
        fileName,
        content,
        weather,
      );
      return res.status(201).json({ message: '생성완료' });
    } catch (error) {
      logger.error(error.message);

      res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = PostController;
