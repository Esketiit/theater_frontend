import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
    state = {
        name: "",
        password: "",
        password_confirmation: "",
        errors: ""
    }

    handleChange = e => {
        console.log(this.state)
        this.setState({ [e.target.name]: e.target.value })
        // console.log(this.state)
    }

    onSubmit = (e) => {
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
            .then(resp => console.log(resp, "registration"))
            .catch(error => console.log(error, "error"))

        console.log(this.state)
    }

    componentDidMount() {
        this.props.logout()
    }

    render() {
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Welcome To Theater
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} fluid icon='user' iconPosition='left' placeholder='User Name' />
                                <Form.Input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} icon='keyboard outline' fluid iconPosition='left' placeholder='Password' />
                                <Form.Input onChange={(e) => this.handleChange(e)} name="password_confirmation" value={this.state.password_confirmation} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' />
                                <Button color='teal' fluid size='large' onClick={(e) => this.onSubmit(e)}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home