import useLikePost from "./useLikePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const LikePost = ({ postId, likes }) => {
    const {
        user,
        handleLikePost,
    } = useLikePost(postId);

    return (
        <>
            {likes.includes(JSON.parse(user)._id) ? (
                <button onClick={() => handleLikePost()}>
                    <FontAwesomeIcon icon={faHeartBroken} className="mr-1 text-red-600" />
                    <span>{likes?.length}</span>
                </button>
            ) : (
                <button onClick={() => handleLikePost()}>
                    <FontAwesomeIcon icon={faHeart} className="mr-1 text-red-600" />
                    <span>{likes?.length}</span>
                </button>
            )}
        </>
    )
}

export default LikePost;