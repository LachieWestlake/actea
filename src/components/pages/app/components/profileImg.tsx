import * as React from "react";
import { Component } from "react";
import LoadIcon from "./loadIcon";
export interface ProfileImgProps {
  img: any;
  picClasses?: string;
}

export interface ProfileImgState {}

class ProfileImg extends React.Component<ProfileImgProps, ProfileImgState> {
  componentDidMount() {}
  processPhoto(photoURL) {
    let photo = photoURL;
    if (!photo) {
      photo =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDggNDg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9Ikljb25zIj48ZyBpZD0iSWNvbnNfNl8iPjxwYXRoIGQ9Ik0zMC43NzcyLDE4LjM4NDI4YzEuMTgzMi0wLjAyNjUsMi4zNzUzLDAuMzYyLDMuMDY0LDEuMDY4NSAgICBjMC4wOTcyLDAuMTA1OSwwLjE5NDMsMC4yMTE5LDAuMjczOCwwLjMzNTVjMC44NTY1LDEuMjAwOSwwLjgzLDIuNjY2NywwLjY2MjIsMy45NDcxYy0wLjE1ODksMS4yNTM5LTAuOTM2LDIuNDQ1OS0xLjUwOTksMy42MjkyICAgIGMtMC4zMDkxLDAuNjQ0Ni0wLjI5MTQsMS4xMzAyLDAuMzcwOCwxLjQzMDVjMC42MDkzLDAuMjY0OSwxLjI4MDQsMC4zNzk3LDEuOTA3MywwLjYwOTMgICAgYzAuOTUzNywwLjM2MiwyLjA0ODYsMC41NTYzLDIuODE2OSwxLjIwOTdjMC45NjI0LDAuODIxMiwwLjc0MTcsMi4yMTY0LDAuNzg1OCwzLjM5OTZoLTcuMjE0MmwtMC4wMDAzLDAuMDAxMiAgICBjMC0xLjU4MzQsMC4xMjkzLTMuMzgxMS0wLjkxMTUtNC43MDYyYy0wLjYyODQtMC44MDAxLTEuODEzNS0xLjU0MzktMi43NDUzLTEuODYwNWMwLDAtMC4xMzA5LTAuMjQ2Ni0wLjIxMDQtMC40MTQ0ICAgIGMtMC41ODI4LTEuMTgzMi0xLjEyMTUtMi4wNDQ1LTEuMjgwNS0zLjI5ODRjLTAuMTY3Ny0xLjI4MDQtMC4yMDMxLTIuNzQ2MiwwLjY2MjMtMy45NDcxICAgIGMwLjA3OTUtMC4xMjM2LDAuMTY3OC0wLjIyOTYsMC4yNzM3LTAuMzM1NUMyOC40MTA3LDE4Ljc0NjI4LDI5LjU5MzksMTguMzU3NzgsMzAuNzc3MiwxOC4zODQyOCIgc3R5bGU9ImZpbGw6IzAwOTdEMzsiLz48cGF0aCBkPSJNMTkuNTcxNywxMy45ODY4OGMxLjUxODgtMC4wMzUzLDMuMDM3NSwwLjQ1OTIsMy45MjA2LDEuMzY4NyAgICBjMC4xMzI0LDAuMTMyNCwwLjI0NzIsMC4yNzM3LDAuMzUzMiwwLjQyMzhjMS4xMDM3LDEuNTQ1MywxLjA1OTYsMy40MTczLDAuODQ3Nyw1LjA1OTcgICAgYy0wLjIwMzEsMS42MDcxLTEuMTkyMSwzLjEzNDctMS45MzM4LDQuNjUzNWMtMC4zOTc0LDAuODIxMi0wLjM3MDksMS40NDgxLDAuNDc2OCwxLjgyNzggICAgYzAuNzc3LDAuMzQ0NCwxLjY0MjQsMC40ODU3LDIuNDQ2LDAuNzg1OWMwLjY4ODcsMC4yNjQ5LDEuNDMwNCwwLjQ1MDMsMi4xMjgsMC43MjQxaDAuMDA4OSAgICBjMC41Mzg2LDAuMjAzMSwxLjA0MTksMC40NTkxLDEuNDY1OCwwLjgyMTJjMS4yNDUsMS4wNTk2LDAuOTYyNSwyLjg1MjEsMS4wMDY2LDQuMzYyMUgyMi40MTVIOC44NTE5ICAgIGMwLjA0NDEtMS41MS0wLjIzODQtMy4zMDI1LDEuMDA2Ni00LjM2MjFjMC45ODAyLTAuODM4OSwyLjM4NDEtMS4wNzczLDMuNjAyNy0xLjU0NTNjMC44MDM2LTAuMzAwMiwxLjY2ODktMC40NDE1LDIuNDQ2LTAuNzg1OSAgICBjMC44NDc3LTAuMzc5NywwLjg3NDItMS4wMDY2LDAuNDc2OC0xLjgyNzhjLTAuNzQxNy0xLjUxODgtMS43MzA3LTMuMDQ2NC0xLjkzMzgtNC42NTM1ICAgIGMtMC4yMTE5LTEuNjQyNC0wLjI1NjEtMy41MTQ0LDAuODQ3Ny01LjA1OTdjMC4xMDU5LTAuMTUwMSwwLjIyMDctMC4yOTE0LDAuMzUzMi0wLjQyMzggICAgQzE2LjUzNDEsMTQuNDQ2MDgsMTguMDUyOSwxMy45NTE1OCwxOS41NzE3LDEzLjk4Njg4IiBzdHlsZT0iZmlsbDojMENCMkU1OyIvPjwvZz48L2c+PC9zdmc+";
    }
    return photo;
  }
  render() {
    let img = this.processPhoto(this.props.img);
    return (
      <div className="flex items-center flex-shrink-0">
        {img !== "load" || !img ? (
          <img
            className={this.props.picClasses || "w-10 h-10 rounded-full mr-4"}
            src={img}
            alt="User"
          />
        ) : (
          <LoadIcon className=" w-8 h-8" />
        )}
      </div>
    );
  }
}

export default ProfileImg;
