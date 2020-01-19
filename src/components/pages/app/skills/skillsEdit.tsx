import React, {useState, useEffect} from "react";
import {skillsData, userData} from "../../../../database/data";
import auth from '../../../../auth/auth'
import {Link} from "react-router-dom";
import SkillsDisplay from "./skillsDisplay";

export interface SkillsEditProps {
}

const SkillsEdit: React.FunctionComponent<SkillsEditProps> = () => {
    const [skillText, setSkillText] = useState("");
    const [failModalShown, setFailModalShown] = useState(false);
    useEffect(() => {
        const email = auth.getEmail()
    }, []);

    return <div className="text-center m-auto container flex-grow">
        <div className="mx-auto mb-6 text-center mt-12 font-bold text-xl p-3">
            What skills would you love to share with the world?
        </div>
        <div className="flex flex-wrap mb-6 flex-col items-center">
            <div className="w-full md:w-1/2 px-3  md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Skill
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="displayName"
                    value={skillText}
                    onChange={(e) => setSkillText(e.target.value)}
                />
                <button onClick={() => {
                    if (skillText) {
                        skillsData.createNewSkill(skillText).then(setFailModalShown)
                        setSkillText("")
                    }
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                    Add Skill
                </button>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-6 text-left">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Your Current Skills
                </label>
                <SkillsDisplay email={auth.getEmail() || ""} editing={true}/>
            </div>

        </div>
    </div>;
};

export default SkillsEdit;
