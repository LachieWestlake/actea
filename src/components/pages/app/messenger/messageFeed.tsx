import * as React from 'react';
import { Component } from 'react';
import Message from './message';
import WriteMessage from './writeMessage';
export interface MessageFeedProps {
    
}
 
export interface MessageFeedState {
    
}
 
class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {
    state = {  }
    render() { 
        return ( <div className="flex-grow rounded-lg mx-6 mb-4 overflow-hidden shadow-lg flex bg-white p-4 flex flex-col">
            <Message />
            <WriteMessage />
        </div>  );
    }
}
 
export default MessageFeed;