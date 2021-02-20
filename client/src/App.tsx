import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditTweet } from './components/EditTweet'
import { NewTweet } from './components/NewTweet'
import { LogIn } from './components/LogIn'
import { Logo } from './components/Logo'
import { NotFound } from './components/NotFound'
import { Tweets } from './components/Tweets'
import './App.css';

export interface AppProps { }

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleNewTweet = this.handleNewTweet.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleNewTweet() {
    this.props.history.push('/tweets/new')
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (<div className="app-menu">
      <Link to="/"><Logo /></Link>
      {this.logInLogOutButton()}
    </div>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <div className="menu">
          <div className="button" onClick={this.handleNewTweet}>
            New Tweet
          </div>
          <div className="button" onClick={this.handleLogout}>
            Log Out
          </div>
        </div>
      )
    } else {
      return (
        <div className="button" onClick={this.handleLogin}>
          Log In
        </div>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Tweets {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/tweets/:tweetId/edit"
          exact
          render={props => {
            return <EditTweet {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/tweets/new"
          exact
          render={props => {
            return <NewTweet {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
