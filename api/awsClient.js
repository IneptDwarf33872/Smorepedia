const AWS = require("aws-sdk");

// Configure AWS SDK with environment variables
AWS.config.update({
  accessKeyId: 'AKIAXYKJXLXNRZQOSF7U',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const s3 = new AWS.S3();

module.exports = s3;