import { useRef, useEffect, useState, useMemo } from "react";

const useDisplayPosts = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const [posts, setPosts] = useState([]);
    const postsValues = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

    return { postsValues };
}

export default useDisplayPosts;