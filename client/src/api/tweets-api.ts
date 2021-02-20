import { apiEndpoint } from '../config'
import { Tweet } from '../types/Tweet'
import { NewTweetRequest } from '../types/NewTweetRequest'
import Axios from 'axios'
import { UpdateTweetRequest } from '../types/UpdateTweetReq'

export async function getDailyTweets(idToken: string): Promise<Tweet[]> {
  console.log('Fetching tweets')

  const response = await Axios.get(`${apiEndpoint}/tweets`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('Tweets:', response.data)
  return response.data.items
}

export async function newTweet(
  idToken: string,
  newTweet: NewTweetRequest
): Promise<Tweet> {
  const response = await Axios.post(
    `${apiEndpoint}/tweet`,
    JSON.stringify(newTweet),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.item
}

export async function patchTweet(
  idToken: string,
  tweetId: string,
  updatedTweet: UpdateTweetRequest
): Promise<void> {
  await Axios.patch(
    `${apiEndpoint}/tweet/${tweetId}`,
    JSON.stringify(updatedTweet),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function deleteTweet(
  idToken: string,
  tweetId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/tweet/${tweetId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  tweetId: string
): Promise<string> {
  const response = await Axios.post(
    `${apiEndpoint}/tweets/${tweetId}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.uploadUrl
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await Axios.put(uploadUrl, file)
}
