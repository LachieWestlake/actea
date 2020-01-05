import React, {useState, useEffect} from "react";
import {skillsData} from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import {Link} from "react-router-dom";
import SkillCard from "./skillCard";
import {Skill} from "../../../../database/skillsData";

export interface SkillsDisplayProps {
    email: string | undefined;
    editing?: boolean
}

const SkillsDisplay: React.FunctionComponent<SkillsDisplayProps> = ({email, editing = false}) => {
    const [skills, setSkills] = useState<Array<Skill>>([]);
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
                <SkillCard key={skill.id} skillId={skill.id} editing={editing} email={email}/>
            ))}
        </>
    );
};

export default SkillsDisplay;
