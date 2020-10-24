import React from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        name: "",
        password: "",
        password_confirmation: "",
        errors: false,
        new: false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // Sends fetch request to backend to create new user, then signs in with that new user and calls successfulAuth()
    createAccount = e => {
        e.preventDefault()
        fetch("http://localhost:3000/registrations", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.name,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                }
            }),
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(user => {
                if (user.status === "created") {
                    // sucessfulAuth adds user data to state in app.js, then redirects to the profile page 
                    this.props.successfulAuth(user)
                    this.props.history.push("/profile")
                }
            })
            .catch(error => this.setState({ errors: true }))

        // console.log(this.state)
    }

    // login is pretty much the same as createUser but there's no password confirm and the post request goes to /sessions
    login = e => {
        e.preventDefault()
        fetch("http://localhost:3000/sessions", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.name,
                    password: this.state.password,
                }
            }),
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.logged_in) {
                    // sucessfulAuth adds data data to state in app.js, then redirects to the profile page 
                    this.props.successfulAuth(data)
                    this.props.history.push("/profile")
                }
            })
            .catch(error => this.setState({ errors: true }))
    }

    // changes between login form and create new form using state.new. Also gets rid of error message if it there.
    handleNewClick = () => {
        if (this.state.errors) {
            this.setState({ errors: false })
        }
        this.setState({ new: !this.state.new })
    }

    render() {
        return (
            <div>
                {
                    // if this.state.new is true, then show a form that creates a new user and logs them in. 
                    // clicking "Been Here Before" changes this.state.new to false
                    this.state.new ?
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Welcome To Theater
                        </Header>
                                <Form size='large'>
                                    <Segment stacked>
                                        <Form.Input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} fluid icon='user' iconPosition='left' placeholder='User Name' />
                                        <Form.Input type="password" onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} icon='keyboard outline' fluid iconPosition='left' placeholder='Password' />
                                        <Form.Input type="password" onChange={(e) => this.handleChange(e)} name="password_confirmation" value={this.state.password_confirmation} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' />
                                        <Button color='teal' fluid size='large' onClick={(e) => this.createAccount(e)}>
                                            Create Account
                                        </Button>
                                        {this.state.errors ? <Message>Something went wrong</Message> : null}
                                    </Segment>
                                </Form>
                                <Button color="blue" onClick={() => this.handleNewClick()}>
                                    Been Here Before?
                                </Button>
                            </Grid.Column>
                        </Grid> :
                        // if this.state.new is false, just show the login form. Clicking "New Here?" changes this.state.new to true
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Welcome To Theater
                        </Header>
                                <Form size='large'>
                                    <Segment stacked>
                                        <Form.Input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} fluid icon='user' iconPosition='left' placeholder='User Name' />
                                        <Form.Input type="password" onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} icon='keyboard outline' fluid iconPosition='left' placeholder='Password' />
                                        <Button color='teal' fluid size='large' onClick={(e) => this.login(e)}>
                                            Login
                                </Button>
                                        {this.state.errors ? <Message>Something went wrong</Message> : null}
                                    </Segment>
                                </Form>
                                <Button color="blue" onClick={() => this.handleNewClick()}>
                                    New Here?
                        </Button>
                            </Grid.Column>
                        </Grid>}
            </div>
        )
    }
}

export default Signup