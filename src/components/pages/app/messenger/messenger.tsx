import * as React from "react";
import {Component} from "react";
import MessengerContacts from "./messengerContacts";
import MessageFeed from "./messageFeed";
import {isMobile} from "react-device-detect";
import {FullHeightContext} from "../../../../routes/Routes";

export interface MessengerProps {
    match;
    fullHeightFunction;
}

export interface MessengerState {
}

const FullHeightSender = ({match}) => {
    return <FullHeightContext.Consumer>
        {fullHeightFunction => <Messenger match={match} fullHeightFunction={fullHeightFunction}/>}
    </FullHeightContext.Consumer>
}

class Messenger extends React.Component<MessengerProps, MessengerState> {
    state = {};

    componentDidMount() {
        this.props.fullHeightFunction(true)
    }

    componentWillUnmount(): void {
        this.props.fullHeightFunction(false)
    }

    render() {
        return (
            <div className="flex flex-col flex-grow overflow-hidden">
                {isMobile ? (
                    <div className="flex-grow flex overflow-hidden bg-white">
                        {this.props.match.params.channelId ? (
                            <MessageFeed
                                channelId={this.props.match.params.channelId}
                                key={this.props.match.params.channelId}
                                isMobile={isMobile}
                            />
                        ) : (
                            <MessengerContacts isMobile={isMobile}/>
                        )}
                    </div>
                ) : (
                    <div className="flex-grow flex overflow-hidden bg-white">
                        <MessengerContacts isMobile={isMobile}/>
                        <MessageFeed
                            isMobile={isMobile}
                            channelId={this.props.match.params.channelId}
                            key={this.props.match.params.channelId}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default FullHeightSender;
