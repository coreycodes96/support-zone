import useShowPosts from "./useShowPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faComments } from "@fortawesome/free-solid-svg-icons";
import LikePost from "./LikePost/LikePost";
import CreatePost from "../CreatePost/CreatePost";
import DisplayPostComments from "../../PostComments/DisplayPostComments/DisplayPostComments";

const ShowPosts = ({ groupId }) => {
    const {
        posts,
        loading,
    } = useShowPosts(groupId);

    return (
        <>
            {!loading ? (
                <div className="mt-36 my-40 mx-auto w-4/5">
                    {posts.length > 0 ? posts.map(post => (
                        <div key={post?._id} className="relative my-10 p-5 w-full bg-white shadow-md shadow-gray-300 text-gray-800 rounded">
                            <p className="mb-10 whitespace-pre-line">{post?.body}</p>

                            <div className="w-full flex">
                                <LikePost postId={post?._id} likes={post?.likes} />

                                <DisplayPostComments postId={post?._id} commentCount={post?.commentCount} />
                            </div>

                            <p>created by: {post?.user?.username}</p>
                        </div>
                    )) : (
                        <div className="-mt-32 w-full h-screen flex justify-center items-center">
                            <p>No posts</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-5xl animate-spin" />
                </div>
            )}

            <CreatePost groupId={groupId} />
        </>
    )
}

export default ShowPosts;