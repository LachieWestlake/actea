import * as React from "react";
import ProjectCard from "./projectCard";
import {projectData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";




const ProjectList = (props) => {
    return (
  <div>   
      <div className="flex flex-wrap -mb-4">
      {props.projects.map((data, index) => (
          <div className="w-1/3"> <div className="ml-4"><ProjectCard key={index} data={data} /> </div></div>
      ))}

      </div>
</div>

    );
}

export default ProjectList;