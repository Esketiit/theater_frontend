import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        name: "",
        password: "",
        password_confirmation: "",
        errors: "",
        new: false
    }

    handleChange = e => {
        console.log(this.state)
        this.setState({ [e.target.name]: e.target.value })
        // console.log(this.state)
    }

    // Sends fetch request to backend to create new user, then signs in with that new user and calls successfulAuth()
    createAccount = (e) => {
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
            })
        },
            { withCredentials: true })
            .then(resp => resp.json())
            .then(user => {
                if (user.status === "created") {
                    // sucessfulAuth adds user data to state in app.js, then redirects to the profile page 
                    this.props.successfulAuth(user)
                    this.props.history.push("/profile")
                }
            })
            .catch(error => console.log(error, "error"))

        console.log(this.state)
    }

    render() {
        return (
            <div>
                {
                    // if this.state.new is true, then show a form that creates a new user and logs them in. 
                    // clicking "Been Here Before" changes this.state.new to false
                    this.state.new ? <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                Welcome To Theater
                        </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} fluid icon='user' iconPosition='left' placeholder='User Name' />
                                    <Form.Input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} icon='keyboard outline' fluid iconPosition='left' placeholder='Password' />
                                    <Form.Input onChange={(e) => this.handleChange(e)} name="password_confirmation" value={this.state.password_confirmation} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' />
                                    <Button color='teal' fluid size='large' onClick={(e) => this.createAccount(e)}>
                                        Create Account
                                </Button>
                                </Segment>
                            </Form>
                            <Button color="blue" onClick={() => this.setState({ new: !this.state.new })}>
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
                                        <Form.Input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} icon='keyboard outline' fluid iconPosition='left' placeholder='Password' />
                                        <Button color='teal' fluid size='large' onClick={(e) => this.successfulAuth(e)}>
                                            Login
                                    </Button>
                                    </Segment>
                                </Form>
                                <Button color="blue" onClick={() => this.setState({ new: !this.state.new })}>
                                    New Here?
                            </Button>
                            </Grid.Column>
                        </Grid>}
            </div>
        )
    }
}

export default Signup