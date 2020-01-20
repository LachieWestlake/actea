import * as React from 'react';
import {useState} from "react";
import {SkillPhoto} from "../../../../database/skillsData";
import Viewer from 'react-viewer'

type SkillImgProps = {
    images: Array<SkillPhoto>
}
export const SkillImgExpanded: React.FunctionComponent<SkillImgProps> =
    ({images}) => {
        let imageList = images.map((image) => ({src: image.url}))
        const [visible, setVisible] = React.useState(false);
        const [curImg, setCurImg] = React.useState(0);

        if (imageList.length)
            return (
                <>
                    {images.map((image, index) =>
                        <img className="border h-40 border-gray-300 rounded-lg m-4 relative block cursor-pointer" key={image.id}
                             src={image.url} onClick={()=>{
                                 setCurImg(index)
                                 setVisible(true)
                        }}/>
                    )}
                    <Viewer downloadable activeIndex={curImg} visible={visible} onClose={() => {
                        setVisible(false);
                    }} images={imageList}/>
                </>
            );
        else {
            return <div></div>
        }
    };