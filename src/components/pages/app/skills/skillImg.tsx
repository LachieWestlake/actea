import * as React from 'react';
import {SkillPhoto} from "../../../../database/skillsData";
import {useState} from "react";

type SkillImgProps = {
    image: SkillPhoto
    deleteImage: (imageId: string) => void
    editing: boolean
}
export const SkillImg: React.FunctionComponent<SkillImgProps> =
    ({image, deleteImage, editing}) => {
        const [mouseOver, setMouseOver] = useState(false)
        return (
            <div className="mr-3 mb-2 relative overflow-hidden">
                <img key={image.url}
                     style={{maxWidth: "10rem"}}
                     className="border h-20 border-gray-300 rounded-lg relative block "
                     src={image.url}/>
                {editing ?
                    <a>
                        <div onMouseOver={() => setMouseOver(true)}
                             onMouseLeave={() => setMouseOver(false)}
                             onClick={() => {
                                 if (image.id) deleteImage(image.id)
                             }}
                             className="absolute black-background-hover cursor-pointer rounded-lg h-20 top-0 left-0 bottom-0 right-0 w-full h-full bg-fixed overflow-hidden items-center justify-center flex">
                            {mouseOver ? <i className="fas fa-times text-white"/> : false}
                        </div>
                    </a> : false
                }
            </div>

        );
    };