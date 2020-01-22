import * as React from 'react';
import {useState} from 'react';
import {FirebaseComment, Likes} from "../../../../../database/commentData";
import {ProfileImgAndName} from "../profileImgAndName";
import {commentData} from "../../../../../database/data";
import authUser from "../../../../../auth/auth";

type CommentProps = {
    comment: FirebaseComment,
    reply: (email) => void,
    refresh: () => void
};
export const Comment: React.FunctionComponent<CommentProps> = ({comment, reply, refresh}) => {
    const [likes, setLikes] = useState<Likes>(comment.likes)
    const email = authUser.getEmail()
    const likeClicked = () => {
        if (email && likes) {
            const newState = !likes[email]
            setLikes({...likes, [email]: newState})
            commentData.likeChangeInComment(comment.id, newState)
        }
    }
    let likeButtonColor = () => {
        if (email && likes && likes[email]) {
            return "text-teal-700"
        }
        return ""
    }
    return (
        <div
            className="p-5 sm:m-3 flex flex-col m-0 shadow-md overflow-auto break-word border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded">
            <div className="flex  justify-between">
                <ProfileImgAndName email={comment.user_email} time={comment.date.toDate()} emailShown/>
                <div className={`flex items-center h-4 ${likeButtonColor()}`}>
                    {email === comment.user_email?<div onClick={async ()=>{
                        await commentData.deleteComment(comment.id)
                        refresh()
                    }} className="fas fa-trash mr-2 cursor-pointer text-black"/>: null}
                    <div onClick={()=>reply(email)} className="fas fa-reply mr-2 cursor-pointer text-black"/>
                    <div style={{marginTop: "5px"}}>{commentData.getNumberOfLikes(likes)}</div>
                    <div onClick={likeClicked} className="fas fa-thumbs-up ml-2 cursor-pointer" />
                </div>
            </div>
            <div className="break-all mt-4">{comment.text}</div>
        </div>
    );
};