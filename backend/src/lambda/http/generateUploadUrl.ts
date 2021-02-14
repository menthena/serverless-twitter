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
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    try {
      const signedUrl = await getUploadUrl(todoId)
      logger.info(`get signed url`, todoId, signedUrl)
      const attachmentUrl = `https://${process.env.IMAGE_S3_BUCKET}.s3.amazonaws.com/${todoId}`
      logger.info(`attachmentUrl ${attachmentUrl}`)
      await updateAttachmentUrl(userId, todoId, attachmentUrl)
      logger.info('updated attachmentUrl', todoId, attachmentUrl)
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
