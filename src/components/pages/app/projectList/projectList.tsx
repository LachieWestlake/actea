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
}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
  state = { projects: [], hasMore: false };
  loadNumber = 0;
  loading = false;
  componentDidMount() {
    this.loadMoreProjects();
  }
  loadMoreProjects = () => {
    this.loadNumber += 5; 
    data.getLatestPosts(this.renderData, this.loadNumber, this.props.user?this.props.user:"");
  };
  renderData = (data: Array<Object>) => {
    this.setState({ projects: data });
  };

  render() {
    const Loader =
      this.state.projects.length === 0 ? (
        <LoadIcon />
      ) : (
        false 
      );
    return (
      <div className="py-3" key={(new Date()).getTime()}>
        {Loader}
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
  }
}

export default ProjectList;
