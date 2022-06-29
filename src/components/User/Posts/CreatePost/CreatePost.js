import useCreatePost from "./useCreatePost";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const CreatePost = ({ groupId }) => {
    const {
        isModalOpen,
        setIsModalOpen,
        modalVariants,
        createPost,
        setCreatePost,
        createAPost,
        createPostErrors,
        loading,
    } = useCreatePost(groupId);
    return (
        <>
            <div className="p-5 fixed bottom-0 left-0 w-full flex justify-end">
                <button onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} className="text-3xl text-gray-800" />
                </button>
            </div>

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

                <div className="mt-20 mx-auto p-3 w-4/5 h-auto bg-white rounded">
                    {/* Body */}
                    <div className="w-full">
                        <textarea type="text" placeholder="Post" className="p-1 w-full h-24 resize-none placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={createPost.body} onChange={e => setCreatePost({ ...createPost, body: e.target.value })}></textarea>
                        {createPostErrors.body !== '' && <span className="text-red-600">{createPostErrors.body}</span>}
                    </div>

                    <div className="mt-8">
                        <button disabled={loading} onClick={() => createAPost()} className="p-3 text-white bg-purple-600 rounded">Create Post {loading && <FontAwesomeIcon icon={faSpinner} className="ml-1 animate-spin" />}</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CreatePost;