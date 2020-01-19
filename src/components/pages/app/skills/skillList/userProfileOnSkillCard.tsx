import * as React from 'react';
import {useEffect, useState} from "react";
import {userData} from "../../../../../database/data";
import LoadIcon from "../../components/loadIcon";

type UserProfileOnSkillCardProps = {
    userEmail: string
};
export const UserProfileOnSkillCard: React.FunctionComponent<UserProfileOnSkillCardProps> = ({userEmail}) => {
    const [imgLink, setImgLink] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        userData.getUserFromEmail(userEmail).then(user=>setImgLink(user?.photoURL))
        setLoading(false)
    },[])
    if(loading) return <LoadIcon className="ml-0 w-10"/>
    return (
        <img
            className="w-8 rounded-full"
            src={imgLink}
        />
    );
};