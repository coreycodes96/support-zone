import { useRef, useEffect, useState, useContext } from "react";
import { PostsContext } from "../../../../contexts/PostsContext";
import { api } from "../../../../api";

const useCreatePost = (groupId) => {
    const isMounted = useRef(false);

    const abortCreatePostController = new AbortController();
    const { posts, setPosts } = useContext(PostsContext);

    const [createPost, setCreatePost] = useState({
        body: '',
    });
    const [createPostErrors, setCreatePostErrors] = useState({
        body: '',
    });

    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortCreatePostController.abort();
        }
    }, [])

    const modalVariants = {
        open: { display: "block", x: 0 },
        closed: { display: "none", x: "-100%" },
    }

    const createAPost = () => {
        const errorState = { body: '' };

        //Body Validation
        if (createPost.body === "") {
            errorState.body = "Please enter a post"
        }

        if (isMounted) setCreatePostErrors({ ...errorState });


        if (errorState.body === '') {
            if (isMounted) setLoading(true);

            const data = {
                groupId,
                body: createPost.body,
            }

            api().post("/api/post/create", data, { signal: abortCreatePostController.signal })
                .then(res => {
                    if (isMounted) setLoading(false);
                    if (isMounted) {
                        setPosts([res.data, ...posts]);
                    }
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

                            if (isMounted) setCreatePostErrors({ ...errorState });
                        }
                    }
                })
        }
    }

    return { isModalOpen, setIsModalOpen, modalVariants, createPost, setCreatePost, createPostErrors, createAPost, loading };
}

export default useCreatePost;