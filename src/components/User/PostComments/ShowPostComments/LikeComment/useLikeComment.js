import { useRef, useEffect, useContext } from "react";
import { UserContext } from "../../../../../contexts/UserContext";
import { PostCommentsContext } from "../../../../../contexts/PostCommentsContext";
import { api } from "../../../../../api";

const useLikeComment = (commentId) => {
    const isMounted = useRef(false);

    const { user } = useContext(UserContext);
    const { postComments, setPostComments } = useContext(PostCommentsContext);

    const abortLikeController = new AbortController();

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortLikeController.abort();
        }
    }, [])

    const handleLikeComment = () => {
        api().put("/api/post/comment/like", { commentId }, { signal: abortLikeController.signal })
            .then(res => {
                const comment = postComments.find(comment => comment._id === commentId);

                const updatedComment = {
                    ...comment,
                    likes: res.data
                }

                const newComments = postComments.map(comment => comment._id === commentId ? updatedComment : comment);

                if (isMounted) setPostComments(newComments);
            })
            .catch(error => {
                console.log(error.response);
            })
    }
    return { user, handleLikeComment };
}

export default useLikeComment;