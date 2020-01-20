import React, { useState, useEffect } from 'react';
import { Component } from "react";
import ProjectList from "./projectList";
import CreateNewProject from "./createNewProject";
import SearchProjects from './searchProjects';
import {projectData} from "../../../../database/data";

const ProjectPage = (props) => {
  let [projects, setProjects] = useState([])
  let [loadNumber, setLoadNumber] = useState(0)

  useEffect(()=>{
    loadMoreProjects()
  }, [])                                                  

  const loadMoreProjects = () => {
    setLoadNumber (loadNumber += 9); 
    projectData.getLatestPosts(setProjects, loadNumber, props.user?props.user:"");
  };

    return (
      <div className="container mx-auto mt-6 px-3 ">
        <SearchProjects/>
        {/* <CreateNewProject/> */}
        <ProjectList projects={projects}/>
        <button onClick={loadMoreProjects}  className="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 m-auto block rounded-full my-3"
        >
          Load More
        </button>
      </div>
    );
  
}

export default ProjectPage;
