import * as React from 'react';
import ProfileImg from "./profileImg";
import {userData} from "../../../../database/data";
import Moment from "react-moment";
import {useEffect, useState} from "react";
import {User} from "firebase";
import {UserProperties} from "../../../../database/userData";
import LoadIcon from "./loadIcon";

type ProfileImgAndNameProps = {
    email: string,
    time?: Date,
    emailShown?: boolean
};
export const ProfileImgAndName: React.FunctionComponent<ProfileImgAndNameProps> = ({email, time,emailShown}) => {
    const [user, setUser] = useState<UserProperties>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        userData.getUserFromEmail(email).then((user) => {
            setUser(user)
            setLoading(false)
        })
    }, [])
    if (loading || !user) return <LoadIcon className="w-10 mr-auto"/>
    return (
        <div className="flex items-center">
            <ProfileImg img={user?.photoURL}/>
            <div className="text-sm break-all">
                <div className="text-black leading-none flex flex-wrap">
                    {userData.getUserName(user)}&nbsp;{emailShown?<div className="hidden sm:block">{`(${email})`}</div>:null}
                </div>
                {time ?
                    <Moment fromNow>
                        {time.toUTCString()}
                    </Moment>
                    : false
                }

            </div>
        </div>
    );
};