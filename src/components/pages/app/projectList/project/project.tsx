import * as React from "react";
import { RouteComponentProps } from "react-router";
import Loader from "../../components/loader";
import data from "../../../../../database/data";
import LoadIcon from "../../components/loadIcon";
import Moment from "react-moment";
import ProfileImg from "../../components/profileImg";

export interface ProjectProps {}

export interface ProjectState {
  projectData: any;
  loaded: boolean;
  user: any;
  userLoaded: boolean;
}

class Project extends React.Component<
  ProjectProps & RouteComponentProps<any>,
  ProjectState
> {
  state = { loaded: false, userLoaded: false, projectData: {}, user: {} };
  componentDidMount() {
    this.getUserProjectData();
  }
  componentDidUpdate(){
    console.log('updating...')
    this.getUserProjectData();
  }

  getUserProjectData(){
    data.getProject(this.props.match.params.id, (projectData: any) => {
      data
        .getUserFromEmail(projectData.user_email)
        .then((user: any) => this.setState({ user: user, userLoaded: true }));
      this.setState({ projectData, loaded: true });
    });
  }

  render() {
    console.log(this.state.user)
    return (
      <div className="p-8 container mx-auto flex flex-col md:flex-row">
        {this.state.loaded ? (
          <React.Fragment>
            <div className="p-3">
              <img
                className="rounded-lg mx-auto"
                style={{ maxHeight: "20em" }}
                src={this.state.projectData["image"]}
                alt="Woman paying for a purchase"
              />
            </div>
            <div className="rounded-lg border border-grey-500 shadow-md flex-grow p-2">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-bold p-3">
                {this.state.projectData["title"]}
              </div>
              <p className="text-gray-600 p-3">
                {this.state.projectData["content"]}
              </p>
              <div className="flex items-center p-3">
                {this.state.userLoaded ? (
                  <React.Fragment>
                    <ProfileImg img={this.state.user["photoURL"]} />
                    <div className="text-sm">
                      <p className="text-black leading-none">
                        {this.state.user["displayName"]||this.state.user["email"]}
                      </p>
                      <Moment fromNow>
                        {this.state.projectData["time"].toDate()}
                      </Moment>
                    </div>
                  </React.Fragment>
                ) : (
                  <LoadIcon />
                )}
                <div className="text-sm">
                  {/* <p className="text-black leading-none">{this.state.name}</p>
                <Moment fromNow>{this.props.data.time.toDate()}</Moment> */}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <LoadIcon />
        )}
      </div>
    );
  }
}

export default Project;
