import { useRef, useEffect, useState, useContext } from "react";
import { api } from "../../../../api";
import { PostCommentsContext } from "../../../../contexts/PostCommentsContext";

const useShowPostComments = (postId) => {
    const isMounted = useRef(false);

    const { postComments, setPostComments } = useContext(PostCommentsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const abortPostCommentsController = new AbortController();

    const getPostComments = async (abortPostCommentsController) => {
        setLoading(true);

        try {
            const { data } = await api().get(`/api/post/comment/show/${postId}`, { signal: abortPostCommentsController.signal });

            if (!data) return;

            setLoading(false);

            setPostComments(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isMounted.current = true;

        if (isMounted && isModalOpen) {
            getPostComments(abortPostCommentsController);
        }

        return () => {
            isMounted.current = false;
            abortPostCommentsController.abort();
        }
    }, [isModalOpen])

    const modalVariants = {
        open: { display: "block", x: 0 },
        closed: { display: "none", x: "-100%" },
    }

    return { isModalOpen, setIsModalOpen, modalVariants, loading, postComments };
}

export default useShowPostComments;