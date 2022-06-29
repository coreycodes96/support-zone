import useLikeComment from "./useLikeComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const LikeComment = ({ commentId, likes }) => {
    const {
        user,
        handleLikeComment,
    } = useLikeComment(commentId);

    return (
        <>
            {likes.includes(JSON.parse(user)._id) ? (
                <button onClick={() => handleLikeComment()}>
                    <FontAwesomeIcon icon={faHeartBroken} className="mr-1 text-red-600" />
                    <span>{likes?.length}</span>
                </button>
            ) : (
                <button onClick={() => handleLikeComment()}>
                    <FontAwesomeIcon icon={faHeart} className="mr-1 text-red-600" />
                    <span>{likes?.length}</span>
                </button>
            )}
        </>
    )
}

export default LikeComment;