import React, { useState, useEffect } from "react";
import { skillsData } from "../../../../database/data";
import LoadIcon from "../components/loadIcon";
import { Link } from "react-router-dom";
import SkillCard from "./skillCard";
export interface SkillsDisplayProps {
  email: string | undefined;
}

const SkillsDisplay: React.SFC<SkillsDisplayProps> = ({ email }) => {
  const [skills, setSkills] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    skillsData.getSkillsForUser(email).then((skills: Array<any>) => {
      setSkills(skills);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? <LoadIcon /> : false}
      {skills.map(skill => (
        <SkillCard key={skill.id} skillId={skill.id} />
      ))}
    </>
  );
};

export default SkillsDisplay;
