import React from 'react';
import ReactPlayer from 'react-player'


class Room extends React.Component {
    state = {
        queue: ["https://www.youtube.com/watch?v=KcJTdGC8Q5A", "https://www.youtube.com/watch?v=KcJTdGC8Q5A", "https://www.youtube.com/watch?v=9MrnAJsxL8c"],
        queueIndex: 0,
        playing: true
    }


    next = () => {
        this.setState({ queueIndex: this.state.queueIndex + 1 })
    }

    previous = () => {
        this.setState({ queueIndex: this.state.queueIndex - 1 })
    }

    playing = () => {
        this.setState({ playing: !this.state.playing })
    }

    render() {
        console.log(this.state)
        return (
            <div className="App">
                {this.state.queue.length === 0 ? null : <ReactPlayer url={this.state.queue[this.state.queueIndex]} playing={this.state.playing} volume={0} />}
                <span>{this.state.queueIndex}</span>
                <button onClick={this.playing}>Play/Pause</button>
                <button onClick={this.previous}>Previous Video</button>
                <button onClick={this.next}>Next Video</button>
            </div>
        );
    }
}

export default Room;