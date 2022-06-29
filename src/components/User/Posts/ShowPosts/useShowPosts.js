import { useRef, useEffect, useState, useContext } from "react";
import { api } from "../../../../api";
import { PostsContext } from "../../../../contexts/PostsContext";

const useShowPosts = (groupId) => {
    const isMounted = useRef(false);

    const abortPostsController = new AbortController();

    const { posts, setPosts } = useContext(PostsContext);
    const [loading, setLoading] = useState(false);

    const getPosts = async (abortPostsController) => {
        setLoading(true);

        try {
            const { data } = await api().get(`/api/post/show/${groupId}`, { signal: abortPostsController.signal });
            if (!data) return;

            setLoading(false);

            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isMounted.current = true;

        if (isMounted) {
            getPosts(abortPostsController);
        }

        return () => {
            isMounted.current = false;
        }
    }, [])

    return { posts, loading }
}

export default useShowPosts;