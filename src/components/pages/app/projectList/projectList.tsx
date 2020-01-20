import * as React from "react";
import ProjectCard from "./projectCard";
import {projectData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import Project from "./project/project";
import {notEmpty} from "../../../../database/searchTypes";
import {debounce} from "../../../../database/utils";

export interface ProjectListProps {
    user?: string;
    searchAlignment: SearchAlignment;
}

export interface ProjectListState {
    projects: Array<Object>;
    hasMore: boolean;
    loading: boolean;
    items: number;
    loadingSearch: boolean;
    loadingMore: boolean;
}

export enum SearchAlignment {
    Left = "mr-auto",
    Right = "ml-auto",
    Center = "mx-auto"
}

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
    state = {projects: [], hasMore: true, loading: true, items: 0, loadingSearch: false, loadingMore: false};

    componentDidMount() {
        this.loadMoreProjects();
    }

    loadMoreProjects = () => {
        projectData.getLatestPosts(this.renderData, this.state.items + 5, this.props.user ? this.props.user : "");
        this.setState({items: this.state.items + 5, loadingMore: true})
    };
    renderData = (data: Object[]) => {
        if (data.length !== this.state.items) {
            this.setState({hasMore: false})
        }
        this.setState({projects: data, loading: false, loadingSearch: false, loadingMore: false});
    };

    handleOnSearch = debounce((searchString) => {
        this.setState({items: 5}, () => {
            if (searchString.length > 0) {
                projectData.getPostSearchResults(searchString).then((ids) => {
                    Promise.all(ids.map(async idOfPost => {
                        return await projectData.getPost(idOfPost.id)
                    })).then((data) => {
                        this.renderData(data.filter(notEmpty))
                    })
                })
            } else {
                this.setState({hasMore: true})
                projectData.getLatestPosts(this.renderData, this.state.items, this.props.user ? this.props.user : "");
            }
        })
    }, 500)


    render() {
        if (this.state.loading) return <LoadIcon/>
        return (
            <div>
                <div>
                    <input type="text"
                           className={`border-2 py-2 px-4 ${this.props.searchAlignment} mt-4  block rounded-full`}
                           name="title"
                           onChange={(e) => {
                               this.handleOnSearch(e.target.value)
                               this.setState({loadingSearch: true})
                           }}
                           placeholder={'Search Here...'}/>
                </div>
                {this.state.loadingSearch ?
                    <LoadIcon/> :
                    <div className="py-3">
                        {this.state.projects.map((data) => (
                            <ProjectCard key={data["id"]} data={data}/>
                        ))}
                        {this.state.hasMore ? <button
                            onClick={this.loadMoreProjects}
                            className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 m-auto block rounded-full my-3"
                        >
                            {this.state.loadingMore ? <span>Loading...</span> : <span>Load More</span>}
                        </button> : false}
                    </div>
                }

            </div>

        )
    }
}

export default ProjectList;
