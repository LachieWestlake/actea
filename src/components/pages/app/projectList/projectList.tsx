import * as React from "react";
import ProjectCard from "./projectCard";
import data from "../../../../database/data";
import LoadIcon from "../components/loadIcon";

export interface ProjectListProps {
  user?: string;
}

export interface ProjectListState {
  projects: Array<Object>;
  hasMore: boolean;
  loading: boolean
}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
  state = { projects: [], hasMore: false, loading: true };
  loadNumber = 0;
  componentDidMount() {
    this.loadMoreProjects();
  }
  loadMoreProjects = () => {
    this.loadNumber += 5; 
    data.getLatestPosts(this.renderData, this.loadNumber, this.props.user?this.props.user:"");
  };
  renderData = (data: Array<Object>) => {
    this.setState({ projects: data, loading: false })
    ;
  };
  
  render() {
    {if(this.state.loading ) return <LoadIcon></LoadIcon>}
    {if(this.state.projects.length !== 0)
    return (
      <div className="py-3" key={(new Date()).getTime()}>
        {this.state.projects.map((data, index) => (
          <ProjectCard key={index} data={data} />
        ))}
        <button
          onClick={this.loadMoreProjects}
          className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 m-auto block rounded-full my-3"
        >
          Load More
        </button>
      </div>
    );
    else{
      return <h1>Doesn't look like you have joined a project yet</h1>
        }
        }
   

        
  }
}

export default ProjectList;
