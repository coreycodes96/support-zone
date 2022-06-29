import useCreateGroup from "./useCreateGroup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreateGroup = () => {
    const {
        modalVariants,
        isModalOpen,
        setIsModalOpen,
        createGroup,
        setCreateGroup,
        createGroupErrors,
        createAGroup,
        loading,
    } = useCreateGroup();

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
                    {/* Title */}
                    <div className="my-10 w-full">
                        <input type="text" placeholder="Title" className="p-1 w-full h-12 resize-none placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={createGroup.title} onChange={e => setCreateGroup({ ...createGroup, title: e.target.value })} />
                        {createGroupErrors.title !== '' && <span className="text-red-600">{createGroupErrors.title}</span>}
                    </div>

                    {/* Description */}
                    <div className="w-full">
                        <textarea type="text" placeholder="Description" className="p-1 w-full h-24 resize-none placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={createGroup.description} onChange={e => setCreateGroup({ ...createGroup, description: e.target.value })}></textarea>
                        {createGroupErrors.description !== '' && <span className="text-red-600">{createGroupErrors.description}</span>}
                    </div>

                    <div className="mt-8">
                        <button disabled={loading} onClick={() => createAGroup()} className="p-3 text-white bg-purple-600 rounded">Create Group {loading && <FontAwesomeIcon icon={faSpinner} className="ml-1 animate-spin" />}</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CreateGroup;