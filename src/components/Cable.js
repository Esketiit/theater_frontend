import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Cable extends React.Component {
    
    render () {
        return (
        <Fragment>
            {this.props.rooms.map(room => {
            return (
                <ActionCable
                key={room.id}  
                channel={{ channel: 'MessagesChannel', room: room.id }}
                onReceived={this.props.handleReceivedMessage}
                />
            );
            })}
        </Fragment>
        );
    }
};

export default Cable;