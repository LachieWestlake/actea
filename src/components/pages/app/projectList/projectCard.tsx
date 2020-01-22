import * as React from "react";
import { Component } from "react";
import {projectData, userData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import ProfileImg from "../components/profileImg";

export interface ProjectCardProps {
  data: any;
}

export interface ProjectCardState {}

class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
  state = { name: null, img: "load" };
  componentDidMount() {
    userData.getUserFromEmail(this.props.data.user_email).then(this.setUserDetail);
  }
  setUserDetail = userDataInput => {
    let name = userData.getUserName(userDataInput);
    this.setState({ name: name, img: userDataInput.photoURL });
  };
  render() {
    return (
      <Link
        to={"/app/projects/project/" + this.props.data.id}
        className="max-w-2xl cursor-pointer w-full flex flex-col lg:flex-row mx-auto my-5 scale-on-hover shadow-md overflow-auto break-word border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded">
        {this.props.data.image ? (
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center"
            style={{
              backgroundImage: `url('${this.props.data.image}')`
            }}
          />
        ) : (
          false
        )}
        <div className="p-4">
          <div className="mb-8">
            <div className="text-black font-bold text-xl mb-2 break-all">
              {this.props.data.title}
            </div>
            <p className="text-grey-darker text-base break-all">
              {this.props.data.content}
            </p>
          </div>
          <div className="flex items-center">
            <ProfileImg img={this.state.img} />
            <div className="text-sm">
              <p className="text-black leading-none">{this.state.name}</p>
              <Moment fromNow>{this.props.data.time.toDate()}</Moment>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProjectCard;
