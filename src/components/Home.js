import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
    state = {
        name: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    signIn = () => {
        this.props.login(this.state.name)
        this.props.history.push('/select');
    }

    componentDidMount() {
        this.props.logout()
    }

    render() {
        console.log(this.props, "props")
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} fluid icon='user' iconPosition='left' placeholder='User Name' />
                                <Button color='teal' fluid size='large' onClick={() => this.signIn()}>
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