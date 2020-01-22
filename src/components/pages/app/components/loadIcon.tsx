import * as React from 'react';
import { Component } from 'react';
export interface LoadIconProps {
    className?:string
}
 
export interface LoadIconState {
    
}
 
class LoadIcon extends React.Component<LoadIconProps, LoadIconState> {
    state = {  }
    render() {
        const marginSpecified = this.props.className?.includes("mr-") || this.props.className?.includes("ml-")
        // return ( <i className={`fas fa-circle-notch fa-spin text-center text-4xl block ${this.props.className}`} /> );
        return ( <img src={process.env.PUBLIC_URL + '/img/loader/3.svg'} className={`${marginSpecified?"":"m-auto"} ${this.props.className?.includes("w-")?"":"w-20"} ${this.props.className}`} /> );
    }
}
 
export default LoadIcon;