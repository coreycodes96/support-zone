import useJoinGroup from "./useJoinGroup";

const JoinGroup = ({ groupId }) => {
    const {
        handleJoinGroup
    } = useJoinGroup(groupId);
    return (
        <button onClick={() => handleJoinGroup()}>Join Group</button>
    )
}

export default JoinGroup;