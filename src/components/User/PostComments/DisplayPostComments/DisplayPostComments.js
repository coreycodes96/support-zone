import useDisplayComments from "./useDisplayPostComments";
import { PostCommentsContext } from "../../../../contexts/PostCommentsContext";
import ShowPostComments from "../ShowPostComments/ShowPostComments";

const DisplayPostComments = ({ postId, commentCount }) => {
    const {
        postCommentsValues
    } = useDisplayComments();

    return (
        <PostCommentsContext.Provider value={postCommentsValues}>
            <ShowPostComments postId={postId} commentCount={commentCount} />
        </PostCommentsContext.Provider>
    )
}

export default DisplayPostComments;