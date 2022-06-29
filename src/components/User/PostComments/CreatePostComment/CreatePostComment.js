import useCreatePostComment from "./useCreatePostComment";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const CreatePostComment = ({ postId }) => {
    const {
        modalVariants,
        isModalOpen,
        setIsModalOpen,
        createComment,
        setCreateComment,
        createCommentErrors,
        createAComment,
        loading,
    } = useCreatePostComment(postId);

    return (
        <>
            <div className="p-3 fixed top-0 left-0 flex">
                <button onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} className="text-3xl text-white" />
                </button>
            </div>

            <motion.div
                animate={isModalOpen ? "open" : "closed"}
                variants={modalVariants}
                transition={{
                    type: "tween"
                }}
                className="fixed top-0 left-0 w-full h-screen hidden flex-col justify-between items-center bg-black/40 z-20"
            >
                <div className="p-2 w-full flex justify-end">
                    <button onClick={() => setIsModalOpen(false)} className="text-2xl text-white">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                <div className="mt-20 mx-auto p-3 w-4/5 h-500 flex flex-col justify-center items-center bg-gray-100 rounded">
                    {/* Body */}
                    <div className="w-full">
                        <textarea type="text" placeholder="Comment" className="p-1 w-full h-24 resize-none placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={createComment.body} onChange={e => setCreateComment({ ...createAComment, body: e.target.value })}></textarea>
                        {createCommentErrors.body !== '' && <span className="text-red-600">{createCommentErrors.body}</span>}
                    </div>

                    <div className="mt-8 w-full">
                        <button disabled={loading} onClick={() => createAComment()} className="p-3 text-white bg-purple-600 rounded">Create Post {loading && <FontAwesomeIcon icon={faSpinner} className="ml-1 animate-spin" />}</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CreatePostComment;