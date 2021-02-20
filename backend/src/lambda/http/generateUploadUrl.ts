import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUploadUrl } from '../../data-layer/getUploadUrl'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { updateAttachmentUrl } from '../../data-layer/updateAttachmentUrl'
import { getUserId } from '../utils'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tweetId = event.pathParameters.tweetId
    const userId = getUserId(event)
    try {
      const signedUrl = await getUploadUrl(tweetId)
      logger.info(`get signed url`, tweetId, signedUrl)
      const attachmentUrl = `https://${process.env.IMAGE_S3_BUCKET}.s3.amazonaws.com/${tweetId}`
      logger.info(`attachmentUrl ${attachmentUrl}`)
      await updateAttachmentUrl(userId, tweetId, attachmentUrl)
      logger.info('updated attachmentUrl', tweetId, attachmentUrl)
      return {
        statusCode: 200,
        body: JSON.stringify({
          uploadUrl: signedUrl
        })
      }
    } catch (e) {
      logger.error('upload failure', e)
    }
  }
)

handler.use(cors())
