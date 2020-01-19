import React from "react";
import { Component } from "react";
import ProjectList from "./projectList";
import {projectData} from "../../../../database/data";
import ImageUploader from "../components/imageUpload/imageUploader";
import { render } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

export interface SearchProjectsProps {
  
}
 
const SearchProjects = () => {
  return ( 
    <div className="container bg-primary mx-auto flex h-40 rounded">
      <div className="w-2/5  flex my-auto ml-20">      
      <FontAwesomeIcon icon={faLayerGroup} className="mr-4 text-white text-4xl mt-8"/> 
      <h1 className="text-white text-6xl">Projects</h1></div>
      <div className="w-3/5 my-auto">
        <input type="search" className="rounded-full w-10/12 h-8" ></input>
        <div className="flex mt-4">
        <button type="button">Click Me!</button>
        <button type="button">Click Me!</button>
        <button type="button">Click Me!</button>
        </div>
      </div>

    </div>
   );
}
 
export default SearchProjects;