import * as React from "react";
import { Component } from "react";
import { projectData, userData } from "../../../../database/data";
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
    userData
      .getUserFromEmail(this.props.data.user_email)
      .then(this.setUserDetail);
  }
  setUserDetail = userDataInput => {
    let name = userData.getUserName(userDataInput);
    this.setState({ name: name, img: userDataInput.photoURL });
  };

  showProject = () => {};
  render() {
    return (
      <div className="w-full overflow-y-hidden overflow-x-hidden ">
        <Link
          to={"/app/projects/project/" + this.props.data.id}
          className="max-w-2xl cursor-pointer w-full flex flex-col mt-2 h-40 scale-on-hover overflow-auto break-word border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-secondary"
        >
          <div className="flex mt-2">
            <div className="w-1/3 mr-2">
              <img
                className="h-12 w-12 rounded-full float-right"
                src={
                  this.props.data.image ||
                  "https://i.pinimg.com/originals/c2/ec/50/c2ec5019a3fa03add41d58788274b9fb.png"
                }
              ></img>
            </div>
            <div className="w-2/3">
              <div className="flex mt-2 text-lg" style={{textOverflow: 'ellipsis'}}>
                <div className="text-primary mr-2 font-medium">Project:</div >{" "}
                {this.props.data.title}
              </div>
            </div>
          </div>
          <div className="text-center mt-2 font-light text-sm" style={{textOverflow: 'ellipsis'}}>
            <p>{this.props.data.content}</p>
            <div className="flex mb-4 text-primary z-20 mt-2">
              <div className="w-1/2 text-right mr-2" onClick={() => {alert('hello')}}>
                <i className="fas fa-user-plus mr-5" />
                <br />
                Connect
              </div>

              <div className="w-1/2 cursor-pointer text-left ml-2" onClick={() => {alert('hello')}}>
                <i className="fas fa-comment ml-5" />
                <br />
                Message
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProjectCard;

// {this.props.data.image ? (
//   <div
//     className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center"
//     style={{
//       backgroundImage: `url('${this.props.data.image}')`
//     }}
//   />
// ) : (
//   false
// )}
// <div className="p-4">
//   <div className="mb-8">
//     <div className="text-black font-bold text-xl mb-2">
//       {this.props.data.title}
//     </div>
//     <p className="text-grey-darker text-base">
//       {this.props.data.content}
//     </p>
//   </div>
//   <div className="flex items-center">
//     <div className="text-sm">
//       <p className="text-black leading-none">{this.state.name}</p>
//       <Moment fromNow>{this.props.data.time.toDate()}</Moment>
//     </div>
//   </div>
// </div>
