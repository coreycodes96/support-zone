import { useRef, useEffect, useState, useMemo, } from "react";

const useDisplayGroups = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const [groups, setGroups] = useState([]);
    const groupsValues = useMemo(() => ({ groups, setGroups }), [groups, setGroups]);

    return { groupsValues };
}

export default useDisplayGroups;