import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentSection extends React.Component {
    state = {
        comments: [],
        roomName: null,
        currentUser: "",
        comment: ""
    }

    getComments = () => {
        fetch(`http://localhost:3000/room/${this.props.id}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data.videos)
                this.setState({
                    comments: data.comments,
                    roomName: data.roomName
                })
            })

        if (this.props.username !== "") {
            this.setState({ currentUser: this.props.username })
        }
        else {
            this.setState({ currentUser: "Anon" })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.getComments()
    }

    showComments = () => {
        return this.state.comments.map(comment => {
            return (
                <Comment key={comment.id}>
                    <Comment.Author>
                        {comment.user_name}
                    </Comment.Author>
                    <Comment.Content>
                        {comment.content}
                    </Comment.Content>
                </Comment>
            )
        })
    }

    submitComment = () => {
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_name": this.state.currentUser,
                content: this.state.comment,
                "room_id": this.props.id
            })
        })
            .then(resp => resp.json())
            .then(data => this.setState({ content: "" }))
            .then(this.getComments())
    }

    render() {
        console.log(this.state)
        return (
            <Comment.Group style={{ margin: 10 }}>
                {this.showComments()}
                <Form reply>
                    <Form.Input name="comment" input="text" placeholder="Leave A Comment" value={this.state.comment} onChange={e => this.handleChange(e)} />
                    <Button onClick={() => this.submitComment()} content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}

export default CommentSection