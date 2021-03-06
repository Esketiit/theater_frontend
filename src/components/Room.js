import React from 'react';
import ReactPlayer from 'react-player'
import NavBar from './NavBar'
import CommentSection from '../containers/CommentSection'
import { Button, List, Modal, Form, Grid } from 'semantic-ui-react'
import Flexbox from 'flexbox-react';
import { ActionCable } from 'react-actioncable-provider';
import Cable from './Cable';

class Room extends React.Component {
    state = {
        queue: null,
        queueIndex: 0,
        playing: false,
        videoName: "",
        link: "",
        playlist_id: null,
        volume: 0,
        id: null
    }

    getVideos = () => {
        let id = this.props.match.params["id"]
        console.log(id)
        fetch(`http://localhost:3000/rooms/${id}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data.videos)
                this.setState({
                    queue: data.videos,
                    playlist_id: data.playlist[0].id,
                    id: data.id
                })
            })
    }

    componentDidMount() {
        this.getVideos()
    }

    //updates the chat when a new comment is revieced
    handleRecievedChat = () => {

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value, e.target.name)
    }

    addVideo = () => {
        fetch("http://localhost:3000/video", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                video: {
                    name: this.state.videoName,
                    link: this.state.link,
                    playlist_id: this.state.playlist_id
                }
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    name: "",
                    link: ""
                })
                this.getVideos()
            })
    }

    deleteVideo = e => {
        // console.log(e.target.id)

        fetch(`http://localhost:3000/video/${e.target.id}`, {
            method: "DELETE"

        })
            .then(resp => resp.json())
            .then(data => {
                this.getVideos()
            })
    }

    editPlaylistName = () => {

    }

    showVideos = () => {
        return this.state.queue.map((video, index) => {
            // console.log(video)
            if (index === this.state.queueIndex) {
                return (
                    // <h4 className="currentlyPlaying">{`${index}.) ${video.name}  <-- Currently Playing`} </h4>
                    <List.Item key={video.id}>
                        <List.Content floated='right'>
                            <Button id={video.id} color="black" onClick={e => this.deleteVideo(e)} > Delete</Button>
                        </List.Content>
                        <List.Content id="currentlyPlaying">
                            <List.Header>{`${video.name}  <-- Currently Playing`}</List.Header>
                            {video.link}
                        </List.Content>
                    </List.Item>
                )
            } else {
                return (
                    <List.Item key={video.id}>
                        <List.Content floated='right'>
                            <Button id={video.id} color="black" onClick={e => this.deleteVideo(e)}>Delete</Button>
                        </List.Content>
                        <List.Content id="currentlyPlaying">
                            <List.Header>{`${video.name}`}</List.Header>
                            {video.link}
                        </List.Content>
                    </List.Item>
                )
            }
        })
    }


    next = () => {
        if (this.state.queueIndex + 1 < this.state.queue.length) {
            this.setState({ queueIndex: this.state.queueIndex + 1 })
        }
    }

    previous = () => {
        if (this.state.queueIndex - 1 >= 0) {
            this.setState({ queueIndex: this.state.queueIndex - 1 })
        }
    }

    playing = () => {
        this.setState({ playing: !this.state.playing })
    }

    volumeUp = () => {
        if (this.state.volume < 9) {
            this.setState({ volume: this.state.volume + 1 })
        }
    }

    volumeDown = () => {
        if (this.state.volume > 0) {
            this.setState({ volume: this.state.volume - 1 })
        }
    }

    render() {
        // console.log(this.state, "state")
        console.log(this.props.user, "props")
        // console.log(this.props.rooms[this.props.match.params.id].playlist, "props")
        return (
            <>
                <NavBar username={this.props.user.username} logout={this.props.logout} />
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column centered>
                            {this.state.queue ? <ReactPlayer style={{ margin: 10 }} url={this.state.queue[this.state.queueIndex].link} playing={this.state.playing} volume={.5} /> : null}

                            {/* <span>{this.state.queueIndex}</span> */}
                            <Button style={{ margin: 10 }} onClick={this.playing}>Play/Pause</Button>
                            <Button style={{ margin: 10 }} onClick={this.previous}>Previous Video</Button>
                            <Button style={{ margin: 10 }} onClick={this.next}>Next Video</Button>
                            <Modal trigger={<Button primary>Add Video</Button>}>
                                <Modal.Header>
                                    Add Video To Playlist
                        </Modal.Header>
                                <Modal.Content>
                                    <p>This video will be added to end of playlist</p>
                                    <Form>
                                        <Form.Input name="videoName" label="Enter Video Name:" type="text" value={this.state.videoName} onChange={e => this.handleChange(e)} />
                                        <Form.Input name="link" label="Enter Link:" type="text" value={this.state.link} onChange={e => this.handleChange(e)} />
                                    </Form>
                                    <Button onClick={() => this.addVideo()}>Create Video</Button>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                        <Grid.Column>
                            {this.state.id ? <CommentSection id={this.state.id} username={this.props.username} /> : null}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row centered columns={1}>
                        {this.state.queue ? <List style={{ width: "650px" }} celled> {this.showVideos()} </List> : null}
                    </Grid.Row>
                </Grid>
            </>
        );
    }
}

export default Room;