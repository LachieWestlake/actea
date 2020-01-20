import * as React from "react";
import ProjectCard from "./projectCard";
import {projectData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Project from "./project/project";
import {notEmpty} from "../../../../database/searchTypes";
import {debounce} from "../../../../database/utils";


export enum SearchAlignment {
  Left = "mr-auto",
  Right = "ml-auto",
  Center = "mx-auto"
}

const ProjectList = (props) => {

    return (
  <div>   
    <h1 className="ml-4 text-4xl text-gray-700">Explore Projects</h1>
      <div className="flex flex-wrap">
      {props.projects ? props.projects.map((data, index) => (
          <div className="w-1/3"> <div className="ml-4"><ProjectCard key={index} data={data} /> </div></div>
      )) : <div/>}

      </div>
</div>

    );
  
}

export default ProjectList;