import useDisplayGroups from "./useDisplayGroups";
import { GroupsContext } from "../../../../contexts/GroupsContext";
import ShowGroups from "../ShowGroups/ShowGroups";

const DisplayGroups = () => {
    const {
        groupsValues
    } = useDisplayGroups();

    return (
        <GroupsContext.Provider value={groupsValues}>
            <ShowGroups />
        </GroupsContext.Provider>
    )
}

export default DisplayGroups;