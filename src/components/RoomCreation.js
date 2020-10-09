import React from 'react';
import NavBar from './NavBar'
import { Form, Select, Button, Modal } from 'semantic-ui-react'

class RoomCreation extends React.Component {
    state = {
        playlists: null,
        playlistName: "",
        description: " ",
        name: " ",
        videoName: "",
        link: "",
        selected: ""
    }
    //update to only show the playlists that the current user have
    getAllPlaylists = () => {
        fetch("http://localhost:3000/playlists")
            .then(resp => resp.json())
            .then(data => this.setState({ playlists: data }))
        console.log("fetch complete")
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log(e.target.value, e.target.name, this.state)
    }

    handlePlaylist = () => {
        //for the buttons 
        this.setState({ playlist: !this.state.playlist })
        console.log(this.state)
    }

    dropOptions = () => {
        return this.state.playlists.map(playlist => {
            // return { key: playlist.id, text: playlist.name, value: playlist.id }
            return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
        })
    }

    createRoom = (e) => {
        e.preventDefault()
        let room = {
            room: {
                name: this.state.name
            }
        }

        console.log(this.state.selected)
        fetch("http://localhost:3000/rooms", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                room: {
                    name: this.state.name,
                    description: this.state.description
                }
            })
        })
            .then(resp => resp.json())
            .then(data => {
                fetch("http://localhost:3000/room_playlists", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        room_playlist: {
                            playlist_id: this.state.selected,
                            room_id: data.id
                        }
                    })
                })
            })
        // this.setState({
        //     selected: null,
        //     name: "",
        //     description: ""
        // })
    }

    // first creates a playlist and then creates a video using the id of the newly created playlist
    // then it call getAllPlaylists so the new playlist shows up in playlist drop down
    createPlaylist = () => {
        fetch("http://localhost:3000/playlists", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playlist: {
                    name: this.state.playlistName
                }
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.getAllPlaylists()
                fetch("http://localhost:3000/videos", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        video: {
                            name: this.state.videoName,
                            link: this.state.link,
                            playlist_id: data.id
                        }
                    })
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        this.setState({
                            playlistName: "",
                            videoName: "",
                            link: ""
                        })
                    })
            })
    }

    componentDidMount() {
        this.getAllPlaylists()
    }
    render() {
        const { value } = this.state
        console.log(this.state)
        return (
            <div className="room_form">
                <NavBar username={this.props.username} />
                <h1>RoomCreation Page!</h1>
                <Form>
                    <Form.Input name="name" label="Room Name:" input="text" placeholder="enter a name" value={this.state.name} onChange={e => this.handleChange(e)} />
                    <label>Select A Playlist</label>
                    <select name="selected" value={this.state.selected} placeholder="select a playlist" onChange={e => this.handleChange(e)}>
                        {this.state.playlists ? this.dropOptions() : ""}
                    </select>
                    <Form.Input name="description" label="Add A Description" input="text" placeholder="Add a Description" value={this.state.description} onChange={e => this.handleChange(e)} />
                    <Button onClick={e => this.createRoom(e)} primary>Create Room!</Button>
                    {/* Playlist creation */}
                    <br></br>
                    <Modal trigger={<Button>Create New Playlist</Button>} closeIcon>
                        <Modal.Header>Create New Playlist</Modal.Header>
                        <Modal.Description>
                            <p>
                                To create a new playlist, you must add a playlist name
                                and one video
                            </p>
                        </Modal.Description>
                        <Modal.Content>
                            <Form>
                                <Form.Group>
                                    <Form.Input name="playlistName" label="Enter Playlist Name:" type="text" placeholder="Favorites, ect." value={this.state.playlistName} onChange={e => this.handleChange(e)} />
                                </Form.Group>
                                <Form.Input name="videoName" label="Enter Video Name:" type="text" value={this.state.videoName} onChange={e => this.handleChange(e)} />
                                <Form.Input name="link" label="Enter Link:" type="text" value={this.state.link} onChange={e => this.handleChange(e)} />
                                <Button size="small" onClick={() => this.createPlaylist()}> Create Playlist!</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </Form>
            </div>
        )
    }
}

export default RoomCreation