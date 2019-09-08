import * as React from 'react';
import { Component } from 'react';
export interface MessengerContactProps {
    // image: String;
    // name: String;
    // lastMessage: String;
    // channelId: String;
}
 
export interface MessengerContactState {
    
}
 
class MessengerContact extends React.Component<MessengerContactProps, MessengerContactState> {
    state = { }
    render() { 
        return ( <div className="max-w-sm rounded-lg mx-6 mb-4 overflow-hidden shadow-lg flex bg-white">
            <img className="h-16 w-16 rounded-full mx-auto mt-4" src="https://deeplydiligent.github.io/images/face.jpg" />
        <div className="p-4">
            
          <div className="font-bold text-xl mb-2">Deep Bhattacharyya</div>
          <p className="text-gray-700 text-base">
            Hey we should make...
          </p>
        </div>
      </div> );
    }
}
 
export default MessengerContact;