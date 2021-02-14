import { S3 } from 'aws-sdk'

export const getUploadUrl = async (todoId: string) => {
  const s3 = new S3({
    signatureVersion: 'v4'
  })

  const signedUrl = await s3.getSignedUrl('putObject', {
    Bucket: process.env.IMAGE_S3_BUCKET, // Name of an S3 bucket
    Key: todoId, // id of an object this URL allows access to
    Expires: '300' // A URL is only valid for 5 minutes
  })
  return signedUrl
}
