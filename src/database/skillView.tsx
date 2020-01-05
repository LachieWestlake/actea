import * as React from 'react';
import SkillCard from "../components/pages/app/skills/skillCard";

type SkillViewProps = {
    match: { params: { skillId: string, email: string } }
    history: any
};
export const SkillView: React.FunctionComponent<SkillViewProps> = ({match, history}) => {
    return (
        <div className="p-6 container mx-auto ">
            <div className="flex items-center mb-8 mt-6 max-w-2xl m-auto"
                 onClick={() => history.goBack()}>
                <i className="fas fa-chevron-left mr-5 ml-2 cursor-pointer"/>
                <label
                    className="block uppercase tracking-wide text-center text-gray-700 text font-bold">
                    Skill Description
                </label>
            </div>

            <SkillCard skillId={match.params.skillId} email={match.params.email} expanded={true}/>
        </div>
    );
};