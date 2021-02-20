import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, newTweet, uploadFile } from '../api/tweets-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface NewTweetProps {
  match: {
    params: {
      tweetId: string
    }
  }
  auth: Auth
}

interface NewTweetState {
  file: any
  uploadState: UploadState
  tweet: string
}

export class NewTweet extends React.PureComponent<
  NewTweetProps,
  NewTweetState
  > {
  state: NewTweetState = {
    file: undefined,
    tweet: '',
    uploadState: UploadState.NoUpload
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleTweetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tweet = event.target.value
    this.setState({
      tweet
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.tweet) {
        alert('Enter your tweet')
        return
      }
      const tweet = await newTweet(this.props.auth.getIdToken(), {
        message: this.state.tweet,
      })
      if (this.state.file) {
        this.setUploadState(UploadState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), tweet.tweetId)

        this.setUploadState(UploadState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)

      }
      alert('Your have just tweeted')
    } catch (e) {
      alert('Could not  tweet: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div className="form">
        <h1>New Tweet</h1>

        <Form onSubmit={this.handleSubmit} inverted>
          <Form.Field>
            <label>Tweet</label>
            <input
              type="text"
              onChange={this.handleTweetChange}
            />
          </Form.Field>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Submit
        </Button>
      </div>
    )
  }
}
