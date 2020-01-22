import * as React from "react";
import {RouteComponentProps} from "react-router";
import {projectData, userData} from "../../../../../database/data";
import LoadIcon from "../../components/loadIcon";
import Moment from "react-moment";
import ProfileImg from "../../components/profileImg";
import {Comments} from "../../components/comments/comments";
import {CommentType} from "../../../../../database/commentData";
import {ProfileImgAndName} from "../../components/profileImgAndName";
import ProjectData, {FirebaseProject} from "../../../../../database/projectData";

export interface ProjectProps {
    history: any
}

export interface ProjectState {
    projectData?: FirebaseProject;
    loaded: boolean;
}

class Project extends React.Component<ProjectProps & RouteComponentProps<any>,
    ProjectState> {
    state: ProjectState = {loaded: false, projectData: undefined};

    componentDidMount() {
        this.getUserProjectData();
    }

    getUserProjectData() {
        projectData.getProject(this.props.match.params.id).then( (projectData: any) => {
            console.log(projectData)
            this.setState({projectData, loaded: true});
        });
    }

    render() {
        if (!this.state.loaded) return <LoadIcon className="pt-6"/>
        if (!this.state.projectData) return <span>No Project Found</span>
        return (
            <div className="container mx-auto p-8">
                <div className="flex items-center mb-8 mt-6 m-auto pl-3"
                     onClick={() => this.props.history.goBack()}>
                    <i className="fas fa-chevron-left mr-5 ml-2 cursor-pointer"/>
                    <label
                        className="block uppercase tracking-wide text-center text-gray-700 text font-bold">
                        Project Description
                    </label>
                </div>
                <div className="pb-8 flex flex-col md:flex-row">
                    {this.state.projectData?.id ? <div className="p-3">
                        <img
                            className="rounded-lg mx-auto border border-2"
                            style={{maxHeight: "20em"}}
                            src={this.state.projectData?.image}
                        />
                    </div> : false}
                    <div className="rounded-lg border border-grey-500 shadow-md flex-grow p-2">
                        <div className="uppercase tracking-wide text-sm text-blue-600 font-bold p-3">
                            {this.state.projectData?.title}
                        </div>
                        <p className="text-gray-600 p-3">
                            {this.state.projectData?.content}
                        </p>
                        <div className="flex items-center p-3">
                            <ProfileImgAndName email={this.state.projectData?.user_email}
                                               time={this.state.projectData?.time.toDate()}/>
                        </div>
                    </div>
                </div>
                <Comments commentType={CommentType.PROJECT} postId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default Project;
