import * as React from 'react';
import { Component } from 'react';
import {startFirebaseUI} from './startFirebaseUI';
export interface LoginPageProps {
    
}
 
export interface LoginPageState {
}
 
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    state = {  }
    componentDidMount(){
        startFirebaseUI ('#firebase-login')
    }
    render() { 
        return ( <div id="firebase-login"></div> );
    }
}
 
export default LoginPage;