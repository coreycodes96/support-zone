import useShowGroups from "./useShowGroups";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import CreateGroup from "../CreateGroup/CreateGroup";
import JoinGroup from "./JoinGroup/JoinGroup";
import { Link } from "react-router-dom";

const ShowGroups = () => {
    const {
        loading,
        groups,
        user,
    } = useShowGroups();

    return (
        <>
            {!loading ? (
                <div className="mt-36 mx-auto w-4/5">
                    {groups.length > 0 ? groups.map(group => (
                        <div key={group._id} className="relative my-10 p-5 w-full bg-white shadow-md shadow-gray-300 text-gray-800 rounded">

                            {user?._id === group?.user?._id && (
                                <div className="p-2 absolute top-2 right-2 bg-purple-500 text-sm text-white rounded-xl">
                                    <p>created</p>
                                </div>
                            )}

                            <p>{group?.title}</p>
                            <p>joined users {group?.joined?.length}</p>

                            {group?.joined?.includes(user?._id) ? (
                                <Link to={`/group/${group?._id}`}>
                                    <FontAwesomeIcon className="mt-5" icon={faDoorOpen} />
                                </Link>
                            ) : (
                                <JoinGroup groupId={group?._id} />
                            )}
                            <p className="mt-5">created by: {group?.user?.username}</p>
                        </div>
                    )) : (
                        <div className="w-full h-screen flex justify-center items-center">
                            <p>No groups</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-5xl animate-spin" />
                </div>
            )}

            <CreateGroup />
        </>
    )
}

export default ShowGroups;