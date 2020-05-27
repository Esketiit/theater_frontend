import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentSection extends React.Component {


    getComments = () => {

    }

    render() {
        return (
            <Comment.Group>
                {/* {this.getComments()} */}
                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}

export default CommentSection