import * as React from "react";
import ProjectList, {SearchAlignment} from "./projectList";
import CreateNewProject from "./createNewProject";
import SearchProjects from './searchProjects';

export interface ProjectPageProps {
}

export interface ProjectPageState {
}

class ProjectPage extends React.Component<ProjectPageProps, ProjectPageState> {
    render() {
        return (
            <div className="container mx-auto mt-6 px-3 ">
                <SearchProjects/>
                <CreateNewProject/>
                <ProjectList searchAlignment={SearchAlignment.Right}/>
            </div>
        );
    }
}

export default ProjectPage;
