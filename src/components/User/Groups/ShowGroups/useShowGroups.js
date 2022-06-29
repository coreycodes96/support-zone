import { useRef, useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { GroupsContext } from "../../../../contexts/GroupsContext";
import { api } from "../../../../api";

const useShowGroups = () => {
    const isMounted = useRef(false);

    const abortGroupsController = new AbortController();

    const { groups, setGroups } = useContext(GroupsContext);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const getGroups = async (controller) => {
        setLoading(true);
        try {
            const { data } = await api().get("/api/group/show", { signal: controller.signal });
            if (!data) return;

            setLoading(false);

            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isMounted.current = true;

        if (isMounted) {
            getGroups(abortGroupsController);
        }

        return () => {
            isMounted.current = false;
            abortGroupsController.abort();
        }
    }, [])

    return { loading, groups, user };
}

export default useShowGroups;