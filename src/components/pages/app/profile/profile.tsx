import * as React from "react";
import {messageData, userData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Moment from "react-moment";
import ProjectList, {SearchAlignment} from "../projectList/projectList";
import {Link, withRouter} from "react-router-dom";
import authUser from "../../../../auth/auth";
import SkillsDisplay from "../skills/skillsDisplay";
import {RouteComponentProps} from 'react-router'
import {UserProperties} from "../../../../database/userData";
import {SkillCardProps} from "../skills/skillList/skillAndUsersCard";
import {useEffect, useState} from "react";

type ProfileProps = RouteComponentProps<ProfileProps> & {
    match: any
    history: any
}

const Profile: React.FunctionComponent<ProfileProps> = ({match, history}) => {
    const [loading, setLoading] = useState(true)
    const [userDataState, setUserDataState] = useState<UserProperties>()

    useEffect(() => {
        if (match.params.email) {
            userData.getUserFromEmail(match.params.email).then(setUserDetail);
        }
    }, [match])

    const message = async () => {
        let myEmail: string | undefined = authUser.getEmail();
        let receiverEmail: string | undefined = userDataState?.email;
        if (myEmail && receiverEmail) {
            let newChat = await messageData.createNewChannel([myEmail, receiverEmail]);
            history.push(`/app/messenger/channel/${newChat}`);
        }
    };

    const setUserDetail = (userDataObj?: UserProperties) => {
        if(userDataObj) setUserDataState(userDataObj);
        setLoading(false)
    }

    if (loading || !userDataState) return <LoadIcon/>;
    return (
        <div className="flex flex-wrap w-full mx-auto xl:overflow-hidden">
            <div className="w-full xl:w-3/12 p-4 xl:h-full overflow-auto">
                <div className="bg-white rounded-lg p-6">
                    <img
                        className="w-32 mb-6 rounded-full mx-auto"
                        src={userDataState!.photoURL}
                    />
                    <div className="text-center">
                        <h2 className="text-lg mb-4">{userDataState?.displayName}</h2>
                        <div className="text-blue-500 mb-4">{userDataState?.university}</div>
                        <div className="text-purple-500 mb-4">{userDataState?.email}</div>
                        <div className="mb-4">{userDataState?.tagline}</div>
                        <div className="text-gray-600 mb-4 text-xs whitespace-pre-wrap">
                            {userDataState!.description}
                        </div>
                        <div className="text-gray-600 mb-4">
                            Created <Moment fromNow>{userDataState!.createdAt?.toDate().toString()}</Moment>
                        </div>
                        {userDataState?.email !== authUser.getEmail() ? (
                            <div className="flex mb-4 justify-center">
                                <div className="w-1/2">
                                    <i className="fas fa-user-plus"/>
                                    <br/>
                                    Connect
                                </div>

                                <div className="w-1/2 cursor-pointer" onClick={message}>
                                    <i className="fas fa-comment"/><br/>
                                    Message
                                </div>
                            </div>
                        ) : false}
                        <Link to="/app/projects">
                            <button
                                className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                                <i className="fas fa-plus"/>
                                &emsp;Create Project
                            </button>
                        </Link>
                        {userDataState!.email === authUser.getEmail() ? (
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
                        {userDataState!.email === authUser.getEmail() ? (
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
            <div className="w-full xl:w-5/12 p-4 xl:h-full overflow-auto no-scrollbar">
                <div className="text-4xl mb-4 text-center">Projects</div>
                <ProjectList searchAlignment={SearchAlignment.Center} user={userDataState!.email}/>
            </div>
            <div className=" w-full xl:w-4/12 p-4 xl:h-full overflow-auto">
                <div className="text-4xl mb-4 text-center">Skills</div>
                <SkillsDisplay email={userDataState!.email}/>
            </div>
        </div>
    );


}

export default withRouter(Profile);
