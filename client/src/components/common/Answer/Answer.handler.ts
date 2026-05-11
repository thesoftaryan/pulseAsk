import { useAppSelector } from "../../../hooks/store.hook";
import { voteAnswerService } from "../../../services/answer/voteAnswer.service";
import type { VotePayload, VoteType } from "../../../types/ApiRequest/vote.type"
import { showToast } from "../../../utils/toast.util";
import type { VoteResponse } from "../../../types/ApiResponse/vote.type";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { FetchCommentsPayload, PostCommentPayload } from "../../../types/ApiRequest/comment.type";
import { fetchAnswerCommentsService, postAnswerCommentService } from "../../../services/answer/answerComment.service";
import type { PostCommentResponse, CommentInterface, FetchCommentsResponse } from "../../../types/ApiResponse/comment.typs";
import { addBookmarkService, isBookmarkedService, removeBookmarkService } from "../../../services/bookmarks.service";



export const useAnswerHandler = (
    setVoting: React.Dispatch<React.SetStateAction<boolean>>,
    setVoteCount: React.Dispatch<React.SetStateAction<number>>,
    setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>,
    setBookmarked: React.Dispatch<React.SetStateAction<boolean>>,
)=>{

    const auth = useAppSelector(state=>state.auth);

    const isBookmarkedHandler = async (tid:string)=>{
        try{
            const data = {
                type: "answer",
                targetId: tid,
            }
            const response = await isBookmarkedService(data);
            const result = parseSuccessResponse<{bookmarked: boolean}>(response);
            setBookmarked(result.data?.bookmarked??false);
        }catch(err){
            const error = parseErrorResponse(err);
            // showToast.error(error.message);
            console.error(error.message);
        }
    }

    const toggleBookmarkHandler = async (tid:string, bookmark:boolean)=>{
        try{
            if(bookmark){
                const data = {
                    type: "answer",
                    targetId: tid,
                };
                const response = await addBookmarkService(data);
                const result = parseSuccessResponse(response);
                showToast.success(result.message);
                setBookmarked(true);
            }else{
                const data = {
                    type: "answer",
                    targetId: tid,
                };
                const response = await removeBookmarkService(data);
                const result = parseSuccessResponse(response);
                showToast.warning(result.message);
                setBookmarked(false);
            }
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }

    const voteAnswerHandler = async (
        vote: VoteType, 
        targetId: string, 
        targetAuthor:string,
    )=>{


        try{
            if(targetAuthor === auth.user?._id){
                showToast.error("You can't vote on yourself");
                return;
            }
            const voteObj:VotePayload = {
                targetId,
                targetAuthor,
                vote,
            }
            setVoting(true);
            const response = await voteAnswerService(voteObj);
            const result = parseSuccessResponse<VoteResponse>(response);
            // console.log(result.data?.voteCount);
            setVoteCount(result.data?.voteCount??0);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setVoting(false);
        }
    }

    const fetchAnswerCommentsHandler = async (aid:string, setFetching: React.Dispatch<React.SetStateAction<boolean>>)=>{
        try{
            const reqObj:FetchCommentsPayload = {
                targetId: aid,
            };
            setFetching(true);
            const response = await fetchAnswerCommentsService(reqObj);
            const result = parseSuccessResponse<FetchCommentsResponse>(response);
            setComments(result.data?.comments??[]);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetching(false);
        }
    }

    const postAnswerCommentHandler = async (
            aid:string, 
            content: string, 
            setPostingComment: React.Dispatch<React.SetStateAction<boolean>>,
            setCommentContent: React.Dispatch<React.SetStateAction<string>>,
        )=>{
        try{
            if(!content || content.length<5){
                showToast.error("comment must be of atleast 5 characters");
                return;
            }
            const reqObj:PostCommentPayload = {
                targetId: aid,
                content,
            };
            setPostingComment(true);
            const response = await postAnswerCommentService(reqObj);
            const result = parseSuccessResponse<PostCommentResponse>(response);
            showToast.success(result.message);
            setCommentContent("");
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setPostingComment(false);
        }
    }

    return {
        isBookmarkedHandler,
        toggleBookmarkHandler,
        voteAnswerHandler,
        fetchAnswerCommentsHandler,
        postAnswerCommentHandler,
    }
}