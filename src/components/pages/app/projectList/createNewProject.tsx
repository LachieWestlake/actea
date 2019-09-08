import * as React from "react";
import { Component } from "react";
import ProjectList from "./projectList";
import data from "../../../../database/data";
import ImageUploader from "../components/imageUpload/imageUploader";

export interface CreateNewProjectProps {}

export interface CreateNewProjectState {}

class CreateNewProject extends React.Component<
  CreateNewProjectProps,
  CreateNewProjectState
> {
  state = { title: "", content: "", showError: false, imageLink:"" ,key:0 };
  createNewPost = () => {
    if (this.state.title && this.state.content) {
      data.addNewProject(this.state.title, this.state.content, this.state.imageLink);
      this.clearTitleContent();
    } else {
      this.setState({ showError: true });
    }
  };
  clearTitleContent = () => {
    this.setState({ title: "", content: "", showError: false, key:this.state.key+1 });
  };
  handleContentChange = (event: any) => {
    let target = event.target as HTMLTextAreaElement;
    this.setState({ content: target!.value });
  };
  handleTitleChange = (event: any) => {
    let target = event.target as HTMLTextAreaElement;
    this.setState({ title: target!.value });
  };
  setImageLink = (link:string) => {
    this.setState({imageLink:link})
  }
  render() {
    return (
      <div className="container mx-auto">
        <div className="flex">
          <div className="flex-grow">
            <input
              className="w-full shadow-md p-4 border-0 rounded-t-lg"
              placeholder="Your Idea"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <textarea
              className="w-full shadow-md p-4 mb-3 rounded-b-lg"
              placeholder="Describe your project in detail"
              rows={4}
              onChange={this.handleContentChange}
              value={this.state.content}
            />
            {this.state.showError ? (
              <div className="ml-auto block mb-2 text-right text-red-500">
                Please enter the details above correctly.
              </div>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="ml-auto table">
          <div className="inline-flex">
            <div className="pr-3">
              <ImageUploader setImage={this.setImageLink} key={this.state.key}/>
            </div>
            <button
              onClick={this.createNewPost}
              className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 ml-auto block rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewProject;
