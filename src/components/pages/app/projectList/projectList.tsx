import * as React from "react";
import ProjectCard from "./projectCard";
import {projectData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";

export interface ProjectListProps {
    user?: string;
    searchAlignment: SearchAlignment;
}

export interface ProjectListState {
    projects: Array<Object>;
    hasMore: boolean;
    loading: boolean
}

export enum SearchAlignment {
    Left = "mr-auto",
    Right = "ml-auto",
    Center = "mx-auto"
}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
    state = {projects: [], hasMore: false, loading: true};
    loadNumber = 0;

    componentDidMount() {
        this.loadMoreProjects();
    }

    loadMoreProjects = () => {
        this.loadNumber += 5;
        projectData.getLatestPosts(this.renderData, this.loadNumber, this.props.user ? this.props.user : "");
    };
    renderData = (data: Array<Object>) => {
        this.setState({projects: data, loading: false})
        ;
    };

    handleOnSearch = (e) => {
        if (e.target.value.length > 0) {
            projectData.getPostSearchResults(this.renderData, e.target.value, this.props.user ? this.props.user : "")
        } else {
            projectData.getLatestPosts(this.renderData, this.loadNumber, this.props.user ? this.props.user : "");
        }
    }


    render() {
        {
            if (this.state.loading) return <LoadIcon></LoadIcon>
        }
        {
            if (this.state.projects.length !== 0)
                return (
                    <div>
                        <div>
                            <input type="text"
                                   className={`border-2 py-2 px-4 ${this.props.searchAlignment} mt-4  block rounded-full`}
                                   name="title" onChange={this.handleOnSearch} placeholder={'Search Here...'}/>
                        </div>
                        <div className="py-3">
                            {this.state.projects.map((data) => (
                                <ProjectCard key={data["id"]} data={data}/>
                            ))}
                            <button
                                onClick={this.loadMoreProjects}
                                className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 m-auto block rounded-full my-3"
                            >
                                Load More
                            </button>
                        </div>
                    </div>

                );
            else {
                return <h1>Doesn't look like you have joined a project yet</h1>
            }
        }


    }
}

export default ProjectList;
