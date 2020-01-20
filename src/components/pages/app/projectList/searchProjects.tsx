import * as React from "react";
import { Component } from "react";
import ProjectList from "./projectList";
import {projectData} from "../../../../database/data";
import ImageUploader from "../components/imageUpload/imageUploader";
import { render } from "react-dom";

export interface SearchProjectsProps {
  
}
 
const SearchProjects: React.FunctionComponent<SearchProjectsProps> = () => {
  return ( 
    <div className="container bg-blue-800 mx-auto flex">
      <div className="w-2/5">hi</div>
      <div className="w-3/5">hi</div>

    </div>
   );
}
 
export default SearchProjects;