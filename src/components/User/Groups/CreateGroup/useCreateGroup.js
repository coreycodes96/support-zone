import { useRef, useEffect, useState, useContext } from "react";
import { GroupsContext } from "../../../../contexts/GroupsContext";
import { api } from "../../../../api/index";

const useCreateGroup = () => {
    const isMounted = useRef(false);

    const { groups, setGroups } = useContext(GroupsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createGroup, setCreateGroup] = useState({
        title: '',
        description: '',
    });
    const [createGroupErrors, setCreateGroupErrors] = useState({
        title: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);

    const abortCreateGroupController = new AbortController();

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortCreateGroupController.abort();
        }
    }, [])

    const modalVariants = {
        open: { display: "block", x: 0 },
        close: { display: "none", x: "-100%" }
    };

    const createAGroup = () => {
        const errorState = { title: '', description: '' };

        //Title
        if (createGroup.title === '') {
            errorState.title = 'Please enter a title';
        } else {
            errorState.title = '';
        }

        //Description
        if (createGroup.description === '') {
            errorState.description = 'Please enter a description';
        } else {
            errorState.description = '';
        }

        if (isMounted) setCreateGroupErrors({ ...errorState });

        if (errorState.title === "" && errorState.description === "") {
            const data = {
                title: createGroup.title,
                description: createGroup.description
            };

            if (isMounted) setLoading(true);

            api().post("/api/group/create", data, { signal: abortCreateGroupController.signal })
                .then(res => {
                    if (isMounted) setLoading(false);
                    if (isMounted) setGroups([res.data, ...groups]);
                    if (isMounted) setIsModalOpen(false);
                })
                .catch(error => {
                    if (isMounted) setLoading(false);

                    const { response } = error;

                    if (Object.prototype.toString.call(error.response.data) === '[object Array]') {
                        for (const errorData of response.data) {
                            if (errorData.title) {
                                errorState.title = errorData.title;
                            }

                            if (errorData.description) {
                                errorState.description = errorData.description;
                            }

                            if (isMounted) setCreateGroupErrors({ ...errorState });
                        }
                    }
                })
        }
    }

    return {
        modalVariants,
        isModalOpen,
        setIsModalOpen,
        createGroup,
        setCreateGroup,
        createGroupErrors,
        createAGroup,
        loading,
    };
}

export default useCreateGroup;