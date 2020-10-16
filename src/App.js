import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './components/Signup'
import Room from './components/Room'
import RoomCreation from './components/RoomCreation'
import ProfileOptions from './components/ProfileOptions'
import RoomSelect from './containers/RoomSelect'
import PlalistCreation from './components/PlaylistCreation'
import './App.css';
import axios from 'axios'

class App extends React.Component {
  state = {
    rooms: null,
    loginStatus: false,
    user: {}
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/rooms")
  //     .then(resp => resp.json())
  //     .then(data => this.setState({ rooms: data }))
  // }

  // adds user data to app state and then redirects to the profile page
  successfulAuth = data => {
    this.setState({
      loginStatus: data.logged_in,
      user: data.user
    })
    console.log(data, "data in succesfulAuth")
    console.log(this.state, "app state after successful auth")
  }

  // REMEMBER THIS: if you want to do ANYTHING with cookies/sessions using fetch, remember to add this: credentials: 'include'
  // ex.
  // fetch("link", {
  //      method: "GET",
  //      headers: headerVariable,
  //      credentials: 'include' 
  // })
  // DONT FORGET PLEEAASE, your sanity wont withstand that kind of stress twice!

  checkLoginStatus = () => {
    fetch("http://localhost:3000/logged_in", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.logged_in && this.state.loginStatus === false) {
          this.setState({
            loginStatus: true,
            user: data.user
          })
        } else if (!data.logged_in && this.state.logged_in) {
          this.setState({
            loginStatus: false,
            user: {}
          })
        }
        console.log(data, "data in checklogin")
        console.log(this.state, "app state after checklogin")
      })
      .catch(error => console.log(error))
  }

  // this is how loginstatus would look with axios
  // checkLoginStatus = () => {
  //   axios("http://localhost:3000/logged_in", { withCredentials: true })
  //     .then(resp => console.log(resp.data, "response from checklogin"))
  // }

  componentDidMount() {
    this.checkLoginStatus()

  }
  render() {
    // console.log(this.state)
    return (
      <>
        <Router>
          {/* <Route path="/" exact render={routerProps => <Home {...routerProps} logout={this.logout} login={this.login} />} /> */}
          <Route path="/signup" render={routerProps => <Signup {...routerProps} successfulAuth={this.successfulAuth} />} />
          <Route path="/createroom" render={() => <RoomCreation user={this.state.user} />} />
          <Route path="/createplaylist" render={() => <PlalistCreation user={this.state.user} />} />
          <Route path="/profile" render={() => < ProfileOptions user={this.state.user} />} />
          <Route path="/select" render={routerProps => <RoomSelect {...routerProps} user={this.state.user} />} />
          <Route path="/room/:id" render={routerProps => <Room {...routerProps} user={this.state.user} />} />
        </Router>
      </>
    );
  }
}

// withRouter() adds router props to the component being exported, in this case it gives router props to app
// the gives access to things like this.props.history.push in app
export default App;
