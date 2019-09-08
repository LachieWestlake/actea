import * as React from "react";
import data from "../../../../database/data";
import authUser from "../../../../auth/auth";
import LoadIcon from "../components/loadIcon";
import { Link } from "react-router-dom";
export interface EditProfileProps {}

export interface EditProfileState {}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
  state = {
    loading: true,
    displayName: "",
    img: "",
    email: "",
    tagline: "",
    description: "",
    phoneNumber: "",
    createdAt: "",
    university: ""
  };
  componentDidMount() {
    let email = authUser.getEmail();
    if (email) {
      data.getUserFromEmail(email).then(this.setUserDetail);
    }
  }

  componentWillUnmount() {
    let email = this.state.email;
    let userData = {
      displayName: this.state.displayName,
      img: this.state.img,
      phoneNumber: this.state.phoneNumber,
      tagline: this.state.tagline,
      description: this.state.description,
      university: this.state.university
    };
    if (email) data.setUserData(email!, userData);
  }

  setUserDetail = userData => {
    console.log(userData);
    this.setState({
        displayName: userData.displayName || "",
      img: userData.photoURL || "",
      email: userData.email || "",
      tagline: userData.tagline || "",
      createdAt: userData.createdAt.toDate() || "",
      phoneNumber: userData.phoneNumber || "",
      description: userData.description || "",
      university: userData.university || "",
      loading: false
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    if (this.state.loading) return <LoadIcon />;
    return (
      <div className="w-full max-w-lg mt-6 mx-auto px-4">
        <img className="w-32 mb-6 rounded-full mx-auto" src={this.state.img} />
        <div className="mx-auto mb-6 text-center">{this.state.email}</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="displayName"
              value={this.state.displayName}
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
              value={this.state.phoneNumber}
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
              value={this.state.university}
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
              value={this.state.tagline}
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
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <Link to={`/app/profile/email/${this.state.email}`} className="mx-auto mt-4">
            <button className=" bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full mx-auto">
              <i className="fa fa-check" />
              &emsp;Save
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default EditProfile;
