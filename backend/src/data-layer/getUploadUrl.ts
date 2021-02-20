import { S3 } from 'aws-sdk'
import { createLogger } from '../utils/logger'

const logger = createLogger('lambda')

export const getUploadUrl = async (tweetId: string) => {
  const s3 = new S3({
    signatureVersion: 'v4'
  })

  const signedUrl = await s3.getSignedUrl('putObject', {
    Bucket: process.env.IMAGE_S3_BUCKET, // Name of an S3 bucket
    Key: tweetId, // id of an object this URL allows access to
    Expires: '300' // A URL is only valid for 5 minutes
  })
  logger.info('signed url', signedUrl)

  return signedUrl
}
