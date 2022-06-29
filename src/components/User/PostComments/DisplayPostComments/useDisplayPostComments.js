import { useRef, useEffect, useState, useMemo } from "react";

const useDisplayPostComments = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const [postComments, setPostComments] = useState([]);
    const postCommentsValues = useMemo(() => ({ postComments, setPostComments }), [postComments, setPostComments]);

    return { postCommentsValues };
}

export default useDisplayPostComments;