import * as React from "react";
import {userData} from "../../../../database/data";
import authUser from "../../../../auth/auth";
import LoadIcon from "../components/loadIcon";
import {Link} from "react-router-dom";
import {Timestamp} from 'firebase/storage';
import {UserProperties} from "../../../../database/userData";

export interface EditProfileProps {
}

export interface EditProfileState {
    userData?: UserProperties
    loading: boolean
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {

    state: EditProfileState = {loading: true, userData: undefined}

    componentDidMount() {
        let email = authUser.getEmail();
        if (email) {
            userData.getUserFromEmail(email).then(this.setUserDetail);
        }
    }

    componentWillUnmount() {
        let email = this.state.userData?.email;
        if (email && this.state.userData) userData.setUserData(email!, this.state.userData);
    }

    setUserDetail = (userDataObj: UserProperties) => {
        this.setState({userData: userDataObj, loading: false});
    };

    handleChange = ({target}) => {
        let userData = this.state.userData
        if (userData) {
            userData[target.name] = target.value
            this.setState({userData: userData})
        }
    };

    render() {
        if (this.state.loading) return <LoadIcon/>;
        return (
            <div className="w-full max-w-lg mt-6 mx-auto px-4">
                <img className="w-32 mb-6 rounded-full mx-auto" src={this.state.userData?.photoURL}/>
                <div className="mx-auto mb-6 text-center">{this.state.userData?.email}</div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            name="displayName"
                            value={this.state.userData?.displayName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Phone
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="phoneNumber"
                            type="text"
                            value={this.state.userData?.phoneNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            University
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            name="university"
                            value={this.state.userData?.university}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Tagline
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            name="tagline"
                            value={this.state.userData?.tagline}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="description"
                            value={this.state.userData?.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Link to={`/app/profile/email/${this.state.userData?.email}`} className="mx-auto mt-4">
                        <button
                            className=" bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full mx-auto">
                            <i className="fa fa-check"/>
                            &emsp;Save
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default EditProfile;
