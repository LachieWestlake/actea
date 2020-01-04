import * as React from "react";
import {useEffect, useState} from "react";
import {skillsData} from "../../../../database/data";
import {Link} from "react-router-dom";
import LoadIcon from "../components/loadIcon";

export interface SkillCardProps {
    skillId: string;
}

type SkillDetails = {
    name?: string;
};
type Image = {
    url?: string
    user?: string
}

const SkillCard: React.FunctionComponent<SkillCardProps> = ({skillId}) => {
    const [images, setImages] = useState([]);
    const [skillDetails, setSkillDetails] = useState<SkillDetails>();
    const [loadingDetails, setLoadingDetails] = useState(true);
    useEffect(() => {
        skillsData
            .getSkillImages(skillId)
            .then(skillImages => setImages(skillImages));
        skillsData.getSkillDetails(skillId).then(skill => {
            setSkillDetails(skill)
            setLoadingDetails(false)
        });
    }, [skillId]);

    return (
        <>
            <Link
                to={"/app/skills"}
                className="max-w-2xl cursor-pointer w-full flex flex-col lg:flex-row mx-auto my-5 scale-on-hover shadow-md overflow-auto break-word border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded">
                {/* {data.image ? (
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center"
            style={{
              backgroundImage: `url('${this.props.data.image}')`
            }}
          />
        ) : (
          false
        )} */}{loadingDetails ? <LoadIcon className="m-auto block"/> : false}
                <div className="p-4">

                    <div className="mb-4">
                        <div className="text-black font-bold text-xl mb-2">{skillDetails?.name}</div>
                        <p className="text-grey-darker text-base">{}</p>
                    </div>
                    <div className="flex items-center">
                        {images.map((image: Image) =>
                            <img key={image.url} className="w-1/4 border border-gray-300 rounded-lg" src={image.url}>
                            </img>)}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default SkillCard;
