const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/awsconfig.json');
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'img.castlejun-2.shop',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1000 * 1000 * 10 },
});
module.exports = upload;
