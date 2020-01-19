import * as React from "react";
import {userData} from "../../../../../database/data";
import {UserProperties} from "../../../../../database/userData";
import ProfileImg from "../../components/profileImg";

type UserProfileOnSkillsOverviewProps =  {
    email: string;
};

export interface UserProfileOnSkillsOverviewState {
}

class UserProfileOnSkillsOverview extends React.Component<UserProfileOnSkillsOverviewProps,
    UserProfileOnSkillsOverviewState> {
    state = {image: "load", name: "", lastMessage: ""};

    componentDidMount() {
        userData.getUserFromEmail(this.props.email).then(this.renderUserData);
    }

    renderUserData = (user?: UserProperties) => {
        if (user) {
            this.setState({
                name: userData.getUserName(user),
                image: user.photoURL
            });
        }

    };

    render() {
        return (
            <div className="flex pb-2 justify-center">
                {/*{this.props.backButton ? (*/}
                {/*  <div className="flex items-center"*/}
                {/*    onClick={() => {*/}
                {/*      this.props.history.push("/app/messenger");*/}
                {/*    }}>*/}
                {/*    <i className="fas fa-chevron-left mr-5 ml-2" />*/}
                {/*  </div>*/}
                {/*) : (*/}
                {/*  false*/}
                {/*)}*/}
                <ProfileImg
                    picClasses={`h-8 w-8 rounded-full mx-auto flex-no-shrink`}
                    img={this.state.image}
                />
                <div className="pl-4 py-2 overflow-hidden">
                    <div className=" text-xl">{this.state.name}</div>
                </div>
            </div>
        );
    }
}

export default UserProfileOnSkillsOverview;
