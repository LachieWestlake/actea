import * as React from 'react';
import {useEffect, useState} from 'react';
import SingleSkillCardForUser from "./singleSkillCardForUser";
import {Skill} from "../../../../database/skillsData";
import {skillsData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";

type SkillViewProps = {
    match: { params: { skillId: string, email: string } }
    history: any
};
export const SkillView: React.FunctionComponent<SkillViewProps> = ({match, history}) => {
    const [skill, setSkill] = useState<Skill>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (match.params.skillId) {
            skillsData.getSkillDetails(match.params.skillId).then((skill)=>{
                setSkill(skill)
                setLoading(false)
            })
        }
    }, [])

    if (!match.params.skillId) return <span>ERROR: No skill id provided</span>
    if (loading) return <LoadIcon/>
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
            {skill ?
                <SingleSkillCardForUser skill={skill} email={match.params.email} expanded={true}/> : false}
        </div>
    );
};