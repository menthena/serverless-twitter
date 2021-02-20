import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { newTweet, deleteTweet, getDailyTweets, patchTweet } from '../api/tweets-api'
import Auth from '../auth/Auth'
import { Tweet } from '../types/Tweet'

interface TweetsProps {
  auth: Auth
  history: History
}

interface TweetsState {
  tweets: Tweet[]
  newTweetName: string
  loadingTweets: boolean
}

export class Tweets extends React.PureComponent<TweetsProps, TweetsState> {
  state: TweetsState = {
    tweets: [],
    newTweetName: '',
    loadingTweets: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTweetName: event.target.value })
  }

  onEditButtonClick = (tweetId: string) => {
    this.props.history.push(`/tweets/${tweetId}/edit`)
  }

  onTweetCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const tweet = await newTweet(this.props.auth.getIdToken(), {
        message: this.state.newTweetName,
      })
      this.setState({
        tweets: [...this.state.tweets, tweet],
        newTweetName: ''
      })
    } catch {
      alert('Tweet creation failed')
    }
  }

  onTweetDelete = async (tweetId: string) => {
    try {
      await deleteTweet(this.props.auth.getIdToken(), tweetId)
      this.setState({
        tweets: this.state.tweets.filter(tweet => tweet.tweetId != tweetId)
      })
    } catch {
      alert('Tweet deletion failed')
    }
  }

  onTweetCheck = async (pos: number) => {
    try {
      const tweet = this.state.tweets[pos]
      await patchTweet(this.props.auth.getIdToken(), tweet.tweetId, {
        message: tweet.message,
      })
    } catch {
      alert('Tweet deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const tweets = await getDailyTweets(this.props.auth.getIdToken())
      this.setState({
        tweets,
        loadingTweets: false
      })
    } catch (e) {
      alert(`Failed to fetch tweets: ${e.message}`)
    }
  }

  render() {
    return (
      <div className="tweets">
        <Header inverted as="h1">Today’s Tweets</Header>

        {this.renderTweets()}
      </div>
    )
  }



  renderTweets() {
    if (this.state.loadingTweets) {
      return this.renderLoading()
    }

    return this.renderTweetsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inverted inline="centered">
          Loading Tweets
        </Loader>
      </Grid.Row>
    )
  }

  renderTweetsList = () =>
    this.state.tweets.map((tweet, pos) => (
      <ul key={pos}>
        <li>
          <div>{tweet.picture && <img src={tweet.picture} className="picture" />}</div>
          <div><p>{tweet.message}</p><b>{tweet.name}</b></div>

          <div>{tweet.attachmentUrl && <img src={tweet.attachmentUrl} className="attachment" />}</div>
        </li>
      </ul>
    ))

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
