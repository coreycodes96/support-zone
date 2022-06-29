import { useRef, useEffect, useState, useContext } from "react";
import { api } from "../../../../../api";
import { UserContext } from "../../../../../contexts/UserContext";
import { PostsContext } from "../../../../../contexts/PostsContext";

const useLikePost = (postId) => {
    const isMounted = useRef(false);

    const abortLikeController = new AbortController();
    const { user } = useContext(UserContext);
    const { posts, setPosts } = useContext(PostsContext);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortLikeController.abort();
        }
    }, [])

    const handleLikePost = () => {
        api().put("/api/post/like", { postId }, { signal: abortLikeController.signal })
            .then(res => {
                const post = posts.find(post => post._id === postId);

                const updatedPost = {
                    ...post,
                    likes: res.data
                }

                const newPosts = posts.map(post => post._id === postId ? updatedPost : post);

                if (isMounted) setPosts(newPosts);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    return { user, handleLikePost };
}

export default useLikePost;