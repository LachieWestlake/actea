import * as React from "react";
import SkillsData, {Skill} from "../../../../../database/skillsData";
import {UserProperties} from "../../../../../database/userData";
import LoadIcon from "../../components/loadIcon";
import {skillsData} from "../../../../../database/data";
import {SkillImg} from "../skillImg";
import ImageUploader from "../../components/imageUpload/imageUploader";
import {SkillImgExpanded} from "../skillImgExpanded";
import {Link} from "react-router-dom";
import {UserProfileOnSkillCard} from "./userProfileOnSkillCard";

export interface SkillCardProps {
    skill: Skill
}

const SkillAndUsersCard: React.FunctionComponent<SkillCardProps> = ({skill}) => {
    const filteredUsers = skillsData.filterUsersWithSkill(skill)
    return <div className={`max-w-2xl flex flex-col lg:flex-row my-5 mx-3 md:mx-auto scale-on-hover
                shadow-md overflow-auto break-word border-r border-b border-l border-grey-light 
                lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded`}>
        <Link to={`/app/skill/${skill.id}`} className={"w-full"}>
            <div className="p-4 w-full">
                <div className="mb-2">
                    <span className="text-black font-bold text-xl capitalize">{skill.name}</span>
                </div>
                <div className="mb-2 flex items-center ">
                    <span
                        className="text-black">See talented professionals skilled in {skill.name}</span>
                    <i className="fas fa-angle-double-right ml-2"/>
                </div>
                <div className="flex items-start mt-2 flex-wrap items-center">
                    {filteredUsers.slice(0, 10)
                        .map(email =>
                            <UserProfileOnSkillCard key={email}
                                                    userEmail={email}/>)}
                    {filteredUsers.length > 10 ? <i className="fas fa-angle-double-right"/> : false}
                </div>
            </div>
        </Link>
    </div>
};

export default SkillAndUsersCard;
