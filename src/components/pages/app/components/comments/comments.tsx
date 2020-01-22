import * as React from 'react';
import {FirebaseComment, CommentType} from "../../../../../database/commentData";
import {RefObject, useEffect, useRef, useState} from "react";
import {commentData} from "../../../../../database/data";
import LoadIcon from "../loadIcon";
import {Comment} from "./comment";
import {debounce} from "../../../../../database/utils";

type CommentsProps = {
    postId: string,
    commentType: CommentType
};

export const Comments: React.FunctionComponent<CommentsProps> = ({postId, commentType}) => {
    const [comments, setComments] = useState<FirebaseComment[]>()
    const inputEl = useRef<any>();
    const [newComment, setNewComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        refreshComments()
    }, [postId, commentType])

    const pageName = () => {
        switch (commentType) {
            case CommentType.PROJECT:
                return "Comment"
            case CommentType.USER:
                return "Testimonial"
        }
    }
    const refreshComments = () => {
        setOpacity(0.5)
        commentData.getComments(postId, commentType).then((comments) => {
            setOpacity(1)
            setComments(comments)
            setLoading(false)
        })
    }

    const submitComment = async () => {
        setOpacity(0.5)
        await commentData.newComment(newComment,postId, commentType)
        setNewComment("")
        refreshComments()
    }

    if (loading) return <LoadIcon/>
    return (
        <div className="p-6 flex flex-col" style={{opacity}}>
            <div className="w-full md:w-2/3 m-auto">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                    Leave a {pageName()}
                </label>
                <textarea
                    ref={inputEl}
                    rows={2}
                    className="appearance-none block w-full bg-gray-200
                    text-gray-700 border border-gray-200 rounded py-3 px-4
                    leading-tight focus:outline-none focus:bg-white
                    focus:border-gray-500 mb-2"
                    value={newComment}
                    onChange={(e)=>setNewComment(e.target.value)}
                />
                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex justify-end items-center " >
                    <div className="cursor-pointer" onClick={submitComment}>Submit <div className="fas fa-chevron-right ml-2"></div></div>
                </div>
                {comments && comments.length > 0 ?
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1  text-center">
                        {pageName()}s <div className="fas fa-sync ml-2 cursor-pointer" onClick={refreshComments}/>
                    </label> : null
                }
                {comments?.map(comment => {
                    return <Comment key={comment.id} comment={comment} reply={(email)=>{
                        setNewComment(`+${email} ${newComment}`);
                        inputEl.current.focus()
                    }} refresh={refreshComments}/>
                })}
            </div>

        </div>
    );
};