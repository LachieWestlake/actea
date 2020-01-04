import * as React from "react";
import {messageData, userData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Moment from "react-moment";
import ProjectList from "../projectList/projectList";
import {Link} from "react-router-dom";
import authUser from "../../../../auth/auth";
import SkillsDisplay from "../skills/skillsDisplay";
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {UserProperties} from "./editProfile";
import {debug} from "util";

type ProfileProps = RouteComponentProps<ProfileProps> & {
    match: any
    history: any
}
type ProfileState = {
    loading: boolean,
    userData?: UserProperties
}

class Profile extends React.Component<ProfileProps> {
    state: ProfileState = {
        loading: true,
        userData: undefined
    };

    componentDidMount() {
        if (this.props.match.params.email) {
            userData.getUserFromEmail(this.props.match.params.email).then(this.setUserDetail);
        }
    }

    message = async () => {
        let myEmail: string | undefined = authUser.getEmail();
        let receiverEmail: string | undefined = this.state.userData?.email;
        if (myEmail && receiverEmail) {
            let newChat = await messageData.createNewChannel([myEmail, receiverEmail]);
            this.props.history.push(`/app/messenger/channel/${newChat}`);
        }
    };

    setUserDetail = (userDataObj: UserProperties) => {
        console.log(userDataObj);
        this.setState({userData: userDataObj, loading: false});
    };

    render() {
        if (this.state.loading) return <LoadIcon/>;
        return (
            <div className="flex flex-wrap w-full mx-auto xl:overflow-hidden">
                <div className="w-full xl:w-3/12 p-4 xl:h-full overflow-auto">
                    <div className="bg-white rounded-lg p-6">
                        <img
                            className="w-32 mb-6 rounded-full mx-auto"
                            src={this.state.userData?.photoURL}
                        />
                        <div className="text-center">
                            <h2 className="text-lg mb-4">{this.state.userData?.displayName}</h2>
                            <div className="text-blue-500 mb-4">{this.state.userData?.university}</div>
                            <div className="text-purple-500 mb-4">{this.state.userData?.email}</div>
                            <div className="mb-4">{this.state.userData?.tagline}</div>
                            <div className="text-gray-600 mb-4 text-xs whitespace-pre-wrap">
                                {this.state.userData?.description}
                            </div>
                            <div className="text-gray-600 mb-4">
                                Created <Moment fromNow>{this.state.userData?.createdAt?.toDate().toString()}</Moment>
                            </div>
                            <div className="flex mb-4 justify-center">
                                <div className="w-1/2">
                                    <i className="fas fa-user-plus"/>
                                    <br/>
                                    Connect
                                </div>
                                {this.state.userData?.email !== authUser.getEmail() ? (
                                    <div className="w-1/2 cursor-pointer" onClick={this.message}>
                                        <i className="fas fa-comment"/><br/>
                                        Message
                                    </div>) : false}
                            </div>
                            <Link to="/app/projects">
                                <button
                                    className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                                    <i className="fas fa-plus"/>
                                    &emsp;Create Project
                                </button>
                            </Link>
                            {this.state.userData?.email === authUser.getEmail() ? (
                                    <Link to="/app/profile/editMyProfile">
                                        <button
                                            className="m-2 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded-full">
                                            <i className="fa fa-pencil-alt"/>
                                            &emsp;Edit Profile
                                        </button>
                                    </Link>
                                ) :
                                false
                            }
                            {this.state.userData?.email === authUser.getEmail() ? (
                                <Link to="/app/profile/editMySkills">
                                    <button
                                        className="m-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full">
                                        <i className="fa fa-align-left"/>
                                        &emsp;Edit Skills
                                    </button>
                                </Link>
                            ) : false
                            }
                        </div>
                    </div>
                </div>
                <div className=" w-full xl:w-4/12 p-4 xl:h-full overflow-auto">
                    <div className="text-4xl mb-4 text-center">Skills</div>
                    <SkillsDisplay email={this.state.userData?.email}/>
                </div>
                <div className="w-full xl:w-5/12 p-4 xl:h-full overflow-auto">
                    <div className="text-4xl mb-4 text-center">Projects</div>
                    <ProjectList user={this.state.userData?.email}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
