import { useRef, useEffect, useState, useContext } from "react";
import { GroupsContext } from "../../../../../contexts/GroupsContext";
import { api } from "../../../../../api";

const useJoinGroup = (groupId) => {
    const isMounted = useRef(false);

    const abortJoinGroupController = new AbortController();

    const { groups, setGroups } = useContext(GroupsContext);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortJoinGroupController.abort();
        }
    }, []);

    const handleJoinGroup = () => {
        api().put("/api/group/enter", { groupId }, { signal: abortJoinGroupController.signal })
            .then(res => {
                const group = groups.find(group => group._id === groupId);

                const updatedGroup = {
                    ...group,
                    joined: res.data
                }

                const newGroups = groups.map(group => group._id === groupId ? updatedGroup : group);

                if (isMounted) setGroups(newGroups);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    return { handleJoinGroup };
}

export default useJoinGroup;