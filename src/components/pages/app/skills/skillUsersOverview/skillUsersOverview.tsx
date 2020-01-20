import React, {useEffect, useState} from 'react';
import {Skill} from "../../../../../database/skillsData";
import {skillsData} from "../../../../../database/data";
import LoadIcon from "../../components/loadIcon";
import SingleSkillCardForUser from "../singleSkillCardForUser";
import UserProfileOnSkillsOverview from "./userProfileOnSkillsOverview";

type SkillUsersOverviewProps = {
    match: { params: { skillId: string } },
    history: any
};
type SingleSkillCardWithUserHeadingProps = {
    skill: Skill,
    email: string,
}
export const SkillUsersOverview: React.FunctionComponent<SkillUsersOverviewProps> = ({match, history}) => {
    const [skill, setSkill] = useState<Skill>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (match.params.skillId) {
            skillsData.getSkillDetails(match.params.skillId).then((skill) => {
                setSkill(skill)
                setLoading(false)
            })
        }
    }, [])

    if (!match.params.skillId) return <span>ERROR: no skillId provided</span>
    if (loading) return <LoadIcon/>
    return (
        <div className="container mx-auto p-6">
            {skill ?
                <>
                    <div className="mb-6 text-center mt-12 font-bold text-3xl flex items-center justify-center">
                        <span onClick={() => {
                            history.goBack();
                        }} className="flex items-center text-lg cursor-pointer">
                            <i className="fas fa-chevron-left mr-5 ml-2" />
                        </span>People with skills in <span className="capitalize ml-2">{skill.name}</span>:
                    </div>
                    {skillsData.filterUsersWithSkill(skill)
                        .map(email => <SingleSkillCardWithUserHeading skill={skill} key={email+skill} email={email}/>)}
                </>
                : <span>Skill Not Found</span>}

        </div>
    );
};

const SingleSkillCardWithUserHeading: React.FunctionComponent<SingleSkillCardWithUserHeadingProps> =
    ({skill, email}) => {
        return <>
            <UserProfileOnSkillsOverview email={email}/>
            <SingleSkillCardForUser
                skill={skill} email={email} expanded={false} editing={false}
                key={email + skill.id}/>
        </>
    }