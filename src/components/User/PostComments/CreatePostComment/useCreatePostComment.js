import { useRef, useEffect, useState, useContext } from "react";
import { PostsContext } from "../../../../contexts/PostsContext";
import { PostCommentsContext } from "../../../../contexts/PostCommentsContext";
import { api } from "../../../../api";

const useCreatePostComment = (postId) => {
    const isMounted = useRef(false);

    const { posts, setPosts } = useContext(PostsContext);
    const { postComments, setPostComments } = useContext(PostCommentsContext);

    const [createComment, setCreateComment] = useState({
        body: ''
    });

    const [createCommentErrors, setCreateCommentErrors] = useState({
        body: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const abortCreateCommentController = new AbortController();

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortCreateCommentController.abort();
        }
    }, [])

    const modalVariants = {
        open: { display: "block", x: 0 },
        close: { display: "none", x: "-100%" },
    }

    const createAComment = () => {
        const errorState = { body: '' };

        //Body validation
        if (createComment.body === '') {
            errorState.body = "Please enter a comment";
        }

        if (isMounted) setCreateCommentErrors({ ...errorState });

        if (errorState.body === "") {
            if (isMounted) setLoading(true);

            const data = {
                postId,
                body: createComment.body,
            };

            api().post("/api/post/comment/create", data, { signal: abortCreateCommentController.signal })
                .then(res => {
                    const post = posts.find(post => post._id === postId);

                    const updatedPost = {
                        ...post,
                        commentCount: post.commentCount + 1
                    }

                    const newPosts = posts.map(post => post._id === postId ? updatedPost : post);

                    if (isMounted) setLoading(false);
                    if (isMounted) setPosts(newPosts);

                    if (isMounted) setPostComments([res.data, ...postComments]);

                    if (isMounted) setIsModalOpen(false);
                })
                .catch(error => {
                    if (isMounted) setLoading(false);

                    const { response } = error;

                    if (Object.prototype.toString.call(error.response.data) === '[object Array]') {
                        for (const errorData of response.data) {
                            if (errorData.body) {
                                errorState.body = errorData.body;
                            }

                            if (isMounted) setCreateCommentErrors({ ...errorState });
                        }
                    }
                })
        }
    }

    return { modalVariants, isModalOpen, setIsModalOpen, createComment, setCreateComment, createCommentErrors, createAComment, loading };
}

export default useCreatePostComment;