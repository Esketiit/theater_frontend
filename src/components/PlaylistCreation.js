import React from 'react';
import NavBar from './NavBar'
import { Form, Select, Button, Modal } from 'semantic-ui-react'

class PlaylistCreation extends React.Component {
    state = {
        playlists: null,
        selected: "",
        playlistName: "",
        videoName: "",
        link: "",
        currentVideos: null
    }

    componentDidMount() {
        this.getAllPlaylists()
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value, e.target.name)
    }

    handleDropChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            currentVideos: this.state.playlists.find(playlist => playlist.id === parseInt(this.state.selected))
        })
        console.log(e.target.value, e.target.name)
    }

    // this.state.playlists.find(playlist => playlist.id === parseInt(this.state.selected))

    getAllPlaylists = () => {
        fetch("http://localhost:3000/playlist")
            .then(resp => resp.json())
            .then(data => this.setState({ playlists: data }))
        console.log("fetch complete")
    }

    dropOptions = () => {
        return this.state.playlists.map(playlist => {
            // return { key: playlist.id, text: playlist.name, value: playlist.id }
            return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
        })
    }

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
                this.setState({ playlistName: "" })
                this.getAllPlaylists()
            })
    }

    createVideo = () => {
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
                    playlist_id: this.state.selected
                }
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    displayPlaylistVideos = () => {
        console.log("displayPlaylistVidoes")
        return this.state.currentVideos.videos.map((video, index) => {
            return <h4>{`${index}.) ${video.name}, link: ${video.link}`}</h4>
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <NavBar logout={this.props.logout} user={this.props.user} />
                <Modal trigger={<Button>Create New Playlist</Button>} closeIcon>
                    <Modal.Header>Create New Playlist</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group>
                                <Form.Input name="playlistName" label="Enter Playlist Name:" type="text" placeholder="Favorites, ect." value={this.state.playlistName} onChange={e => this.handleChange(e)} />
                            </Form.Group>
                            <Button size="small" onClick={() => this.createPlaylist()}> Create Playlist!</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
                <br></br>
                <h3>Add Videos To Playlist Form</h3>
                <Modal trigger={<Button>Add Videos To Playlist</Button>} closeIcon>
                    <Modal.Header>
                        Add Videos To A Playlist
                    </Modal.Header>
                    <Form>
                        <h3>Select A Playlist To Add Videos To</h3>
                        <select name="selected" value={this.state.selected} onChange={e => this.handleDropChange(e)}>
                            {this.state.playlists ? this.dropOptions() : ""}
                        </select>
                        <Form.Input name="videoName" label="Enter Video Name:" type="text" value={this.state.videoName} onChange={e => this.handleChange(e)} />
                        <Form.Input name="link" label="Enter Link:" type="text" value={this.state.link} onChange={e => this.handleChange(e)} />
                    </Form>
                    <Button onClick={this.createVideo}>Submit Video to Playlist</Button>
                    <Modal.Content>
                        <h3>Videos in Current Playlist</h3>
                        {this.state.currentVideos ? this.displayPlaylistVideos() : null}
                    </Modal.Content>
                </Modal>
            </>
        )
    }
}

export default PlaylistCreation