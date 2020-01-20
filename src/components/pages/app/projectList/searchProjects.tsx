import React from "react";
import { Component } from "react";
import ProjectList from "./projectList";
import { projectData } from "../../../../database/data";
import ImageUploader from "../components/imageUpload/imageUploader";
import { render } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export interface SearchProjectsProps {}

const SearchProjects = () => {
  return (
    <div
      className="container rounded-lg mx-auto flex h-40 rounded"
      style={{
        backgroundImage:
          "url(https://i.imgur.com/uBE1Qx6.jpg)"
      }}
    >
      <div className="w-1/5  flex mt-4 ml-8">
        <FontAwesomeIcon
          icon={faLayerGroup}
          className="mr-4 text-white text-5xl mt-8"
        />
        <h1 className="text-white text-6xl">Projects</h1>
      </div>
      <div className="w-4/5 my-auto ml-16">
        <input type="search" className="rounded-full w-11/12 h-10 mr-2"></input>
        <div className="flex mt-4">
          <button className="bg-white" type="button">Click Me!</button>
          <button className="bg-white" type="button">Click Me!</button>
          <button className="bg-white" type="button">Click Me!</button>
        </div>
      </div>
    </div>
  );
};

export default SearchProjects;
