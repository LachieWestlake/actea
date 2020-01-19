import React, {useState, useEffect} from "react";
import {skillsData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import {Link} from "react-router-dom";
import SkillAndUsersCard from "./skillList/skillAndUsersCard";
import {Skill} from "../../../../database/skillsData";
import SingleSkillCardForUser from "./singleSkillCardForUser";

export interface SkillsDisplayProps {
    email: string ;
    editing?: boolean
}

const SkillsDisplay: React.FunctionComponent<SkillsDisplayProps> = ({email, editing = false}) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        let obs = skillsData.getSkillsForUser(email).subscribe((skills) => {
            setSkills(skills);
            setLoading(false);
        });
        return () => {
            obs.unsubscribe()
        }
    }, [email, editing]);
    return (
        <>
            {loading ? <LoadIcon/> : false}
            {skills.map(skill => (
                <SingleSkillCardForUser key={skill.id} skill={skill} editing={editing} email={email}/>
            ))}
        </>
    );
};

export default SkillsDisplay;
