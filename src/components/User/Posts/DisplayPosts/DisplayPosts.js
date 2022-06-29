import { useParams } from "react-router-dom";
import useDisplayPosts from "./useDisplayPosts";
import { PostsContext } from "../../../../contexts/PostsContext";
import ShowPosts from "../ShowPosts/ShowPosts";

const DisplayPosts = ({ }) => {
    const {
        postsValues
    } = useDisplayPosts();

    const { groupId } = useParams();

    return (
        <PostsContext.Provider value={postsValues}>
            <ShowPosts groupId={groupId} />
        </PostsContext.Provider>
    )
}

export default DisplayPosts;