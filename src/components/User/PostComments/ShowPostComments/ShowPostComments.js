import useShowPostComments from "./useShowPostComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner, faPlusCircle, faComments } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import CreatePostComment from "../../PostComments/CreatePostComment/CreatePostComment";
import LikeComment from "./LikeComment/LikeComment";

const ShowPostComments = ({ postId, commentCount }) => {
    const {
        isModalOpen,
        setIsModalOpen,
        modalVariants,
        loading,
        postComments,
    } = useShowPostComments(postId);

    return (
        <>

            <button className="ml-4 flex just-center items-center" onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faComments} className="mr-1" />
                <span>{commentCount}</span>
            </button>

            <motion.div
                animate={isModalOpen ? "open" : "closed"}
                variants={modalVariants}
                transition={{
                    type: "tween"
                }}
                className="fixed top-0 left-0 w-full h-screen hidden flex-col justify-between items-center bg-black/90 z-20"
            >
                <div className="p-2 w-full flex justify-end">
                    <button onClick={() => setIsModalOpen(false)} className="text-2xl text-white">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                <div className="relative mt-20 mx-auto p-3 w-4/5 h-500 bg-white rounded overflow-y-scroll">
                    {!loading ? (
                        <div className="mt-20 my-40 mx-auto w-4/5">
                            {postComments.length > 0 ? postComments.map(comment => (
                                <div key={comment?._id} className="relative my-10 p-5 w-full bg-white shadow-md shadow-gray-400 text-gray-800 rounded">
                                    <p className="mb-10 whitespace-pre-line">{comment?.body}</p>

                                    <div className="w-full flex">
                                        <LikeComment commentId={comment?._id} likes={comment?.likes} />
                                    </div>

                                    <p>created by: {comment?.user?.username}</p>
                                </div>
                            )) : (
                                <div className="mt-56 w-full flex justify-center items-center">
                                    <p>No comments</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-500 flex justify-center items-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-5xl animate-spin" />
                        </div>
                    )}

                    <CreatePostComment postId={postId} />
                </div>
            </motion.div>
        </>
    )
}

export default ShowPostComments;