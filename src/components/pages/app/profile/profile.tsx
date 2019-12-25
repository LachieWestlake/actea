import * as React from "react";
import { Component } from "react";
import {userData, messageData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Moment from "react-moment";
import ProjectList from "../projectList/projectList";
import { Link } from "react-router-dom";
import authUser from "../../../../auth/auth";
export interface ProfileProps {
  match: any;
}

export interface ProfileState {}

class Profile extends React.Component<ProfileProps, ProfileState> {
  state = {
    loading: true,
    name: undefined,
    img: undefined,
    description: undefined,
    email: undefined,
    tagline: undefined,
    createdAt: undefined,
    university: undefined,
    myEmail: authUser.getEmail()
  };
  componentDidMount() {
    if (this.props.match.params.email) {
      userData
        .getUserFromEmail(this.props.match.params.email)
        .then(this.setUserDetail);
    }
  }
  message = async () => {
    let myEmail: string = authUser.getEmail() || "";
    let receiverEmail: string = this.state.email || "";
    let newChat = await messageData.createNewChannel([myEmail, receiverEmail]);

    window.location.replace(`/app/messenger/channel/${newChat}`);
  };
  setUserDetail = userDataObj => {
    console.log(userDataObj);
    this.setState({
      name: userDataObj.displayName,
      img: userDataObj.photoURL,
      email: userDataObj.email,
      description: userDataObj.description,
      tagline: userDataObj.tagline,
      createdAt: userDataObj.createdAt.toDate(),
      university: userDataObj.university,
      loading: false
    });
  };
  render() {
    if (this.state.loading) return <LoadIcon />;
    return (
      <div className="flex flex-wrap container mx-auto">
        <div className="w-full sm:w-3/12 p-4">
          <div className="bg-white rounded-lg p-6">
            <img
              className="w-32 mb-6 rounded-full mx-auto"
              src={this.state.img}
            />
            <div className="text-center">
              <h2 className="text-lg mb-4">{this.state.name}</h2>
              <div className="text-blue-500 mb-4">{this.state.university}</div>
              <div className="text-purple-500 mb-4">{this.state.email}</div>
              <div className="mb-4">{this.state.tagline}</div>
              <div className="text-gray-600 mb-4 text-xs whitespace-pre-wrap">
                {this.state.description}
              </div>
              <div className="text-gray-600 mb-4">
                Created <Moment fromNow>{this.state.createdAt}</Moment>
              </div>
              <div className="flex mb-4 justify-center">
                <div className="w-1/2">
                  <i className="fas fa-user-plus"></i>
                  <br />
                  Connect
                </div>
                {this.state.email !== this.state.myEmail ? (
                  <div className="w-1/2 cursor-pointer" onClick={this.message}>
                    <i className="fas fa-comment"></i>
                    <br />
                    Message
                  </div>
                ) : (
                  false
                )}
              </div>
              <Link to="/app/projects">
                <button className="mb-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                  <i className="fas fa-plus" />
                  &emsp;Create Project
                </button>
              </Link>
              {this.state.email === this.state.myEmail ? (
                <Link to="/app/profile/editMyProfile">
                  <button className="mb-4 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded-full">
                    <i className="fa fa-pencil-alt" />
                    &emsp;Edit Profile
                  </button>
                </Link>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
        <div className=" w-full sm:w-9/12 p-4">
          <div className="text-4xl mb-4 text-center">Projects</div>
          <ProjectList user={this.state.email} />
        </div>
      </div>
    );
  }
}

export default Profile;
