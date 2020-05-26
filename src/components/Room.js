import React from 'react';
import ReactPlayer from 'react-player'
import NavBar from './NavBar'
import { Button, List, Modal, Form } from 'semantic-ui-react'


class Room extends React.Component {
    state = {
        queue: null,
        queueIndex: 0,
        playing: false
    }

    getVideos = () => {
        let id = this.props.match.params["id"]
        console.log(id)
        fetch(`http://localhost:3000/room/${id}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data.videos)
                this.setState({ queue: data.videos })
            })
    }

    componentDidMount() {
        this.getVideos()
    }

    addVideo = () => {

    }

    deleteVideo = () => {

    }

    editVideo = () => {

    }

    editPlaylistName = () => {

    }

    showVideos = () => {
        return this.state.queue.map((video, index) => {
            if (index === this.state.queueIndex) {
                return (
                    // <h4 className="currentlyPlaying">{`${index}.) ${video.name}  <-- Currently Playing`} </h4>
                    <List.Item>
                        <List.Content floated='right'>
                            <Button primary>Edit</Button>
                            <Button color="black">Delete</Button>
                        </List.Content>
                        <List.Content id="currentlyPlaying">
                            <List.Header>{`${index}.) ${video.name}  <-- Currently Playing`}</List.Header>
                            {video.link}
                        </List.Content>
                    </List.Item>
                )
            } else {
                return (
                    <List.Item>
                        <List.Content floated='right'>
                            <Button primary>Edit</Button>
                            <Button black>Delete</Button>
                        </List.Content>
                        <List.Content id="currentlyPlaying">
                            <List.Header>{`${index}.) ${video.name}`}</List.Header>
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
        if (this.state.queueIndex - 1 > 0) {
            this.setState({ queueIndex: this.state.queueIndex - 1 })
        }
    }

    playing = () => {
        this.setState({ playing: !this.state.playing })
    }

    render() {
        // console.log(this.state, "state")
        // console.log(this.props.rooms, "props")
        // console.log(this.props.rooms[this.props.match.params.id].playlist, "props")
        return (
            <>
                <NavBar />
                <div className="player">
                    {this.state.queue ? <ReactPlayer url={this.state.queue[this.state.queueIndex].link} playing={this.state.playing} volume={0} /> : null}
                    <span>{this.state.queueIndex}</span>
                    <button onClick={this.playing}>Play/Pause</button>
                    <button onClick={this.previous}>Previous Video</button>
                    <button onClick={this.next}>Next Video</button><br></br>
                    <Button primary>Edit Playlist</Button>
                    {this.state.queue ? <List celled> {this.showVideos()} </List> : null}
                </div>
            </>
        );
    }
}

export default Room;