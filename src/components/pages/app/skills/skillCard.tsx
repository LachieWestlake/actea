import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {skillsData} from "../../../../database/data";
import {Link} from "react-router-dom";
import LoadIcon from "../components/loadIcon";
import {SkillDescription, SkillPhoto} from "../../../../database/skillsData";
import ImageUploader from "../components/imageUpload/imageUploader";
import {debounce} from "../../../../database/utils";
import {SkillImg} from "./skillImg";
import {SkillImgExpanded} from "../../../../database/skillImgExpanded";

export interface SkillCardProps {
    skillId: string;
    editing?: boolean;
    email: string | undefined
    expanded?: boolean
}

type SkillDetails = {
    name?: string;
};

type LinkWrapperPropTypes = {
    children: JSX.Element,
    to: string,
    hideLink: boolean
}
const LinkWrapper = ({children, to, hideLink}: LinkWrapperPropTypes) =>
    hideLink ? children : <Link to={to}>{children}</Link>

const SkillCard: React.FunctionComponent<SkillCardProps> =
    ({skillId, email, editing = false, expanded = false}) => {
        const [images, setImages] = useState<Array<SkillPhoto>>([]);
        const [skillDetails, setSkillDetails] = useState<SkillDetails>();
        const [skillDescForUser, setSkillDescForUser] = useState<SkillDescription | undefined>();
        const [saving, setSaving] = useState<boolean>(false);
        const [loadingDetails, setLoadingDetails] = useState(true);
        const [imageUploaderKey, setImageUploaderKey] = useState(0);

        useEffect(() => {
            let imgObs = skillsData
                .getSkillImages(skillId)
                .subscribe(setImages);
            let skillObs = skillsData
                .getSkillDescription(skillId)
                .subscribe(setSkillDescForUser);
            skillsData.getSkillDetails(skillId).then(skill => {
                setSkillDetails(skill);
                setLoadingDetails(false)
            });
            return () => {
                imgObs.unsubscribe()
                skillObs.unsubscribe()
            }
        }, [skillId]);


        const writeDescToDb = debounce((text) => {
            skillsData.setSkillDescription(skillId, text)
            setSaving(false)
        }, 1000)

        const imageUploaded = async (imageLink: string) => {
            skillsData.addImage(skillId, imageLink)
            setImageUploaderKey(imageUploaderKey + 1)
        }

        const deleteImage = (imageId: string) => {
            skillsData.deleteImage(skillId, imageId)
        }

        return (
            <LinkWrapper hideLink={editing || expanded} to={`/app/profile/email/${email}/skill/${skillId}`}>
                <>
                    <div
                        className={`max-w-2xl w-full flex flex-col lg:flex-row mx-auto my-5 ${expanded ? "" : "scale-on-hover"}
                    shadow-md overflow-auto break-word border-r border-b border-l border-grey-light 
                    lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded`}>
                        {loadingDetails ? <LoadIcon className="m-auto block"/> : false}
                        <div className="p-4 w-full">
                            <div className="mb-2">
                                <span className="text-black font-bold text-xl  capitalize">{skillDetails?.name}</span>
                                {editing ?
                                    <i className="fas fa-trash-alt ml-3 cursor-pointer" onClick={() => {
                                        skillsData.deleteAssociation(skillId)
                                    }}/> : false
                                }
                            </div>
                            {editing ?
                                <textarea
                                    rows={4}
                                    className="w-full appearance-none border-b-2 mb-2 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={skillDescForUser?.description}
                                    placeholder={"Write about and link to projects where you have shown this skill"}
                                    onChange={(e) => {
                                        let a = skillDescForUser ? setSkillDescForUser({
                                            ...skillDescForUser,
                                            description: e.target.value
                                        }) : false;
                                        setSaving(true)
                                        writeDescToDb(e.target.value)
                                    }
                                    }/> :
                                <div className="my-3 whitespace-pre-line">{skillDescForUser?.description}</div>
                            }
                            {saving ?
                                <div className="mb-3 font-bold">Saving...</div> : false
                            }
                            {!expanded ?
                                <div className="flex items-center mt-2 flex-wrap">
                                    {images.map((image) =>
                                        <SkillImg key={image.url} deleteImage={deleteImage} image={image}
                                                  editing={editing}/>
                                    )}
                                    {editing ?
                                        <ImageUploader
                                            key={imageUploaderKey}
                                            setImage={imageUploaded}
                                            className="px-4 py-2 cursor-pointer border mr-3 border-gray-300 rounded-lg flex justify-center items-center hover:bg-red-100 "/>
                                        : false
                                    }
                                </div> : false}
                        </div>
                    </div>
                    {expanded ?
                        <div className="max-w-2xl m-auto mt-10 flex justify-center items-center flex-row flex-wrap">
                                <SkillImgExpanded images={images}/>
                        </div> : false}
                </>
            </LinkWrapper>
        );
    };

export default SkillCard;
