import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../redux/user/action";
import ChatCard from "../chat/ChatCard";
import EmptyItemsText from "../infoText/EmptyItemsText";
import blankdp from "./../../assets/blank-profile-picture.png";
import NewGroup from "./NewGroup";
import SelectedMember from "./SelectedMember";

const CreateGroup = ({ setIsGroup, onClick }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");

  const user = useSelector((store) => store.user.user);
  const searchUsers = useSelector((store) => store.user.searchUsers);

  const dispatch = useDispatch();

  const handleRemoveMember = (item) => {
    setGroupMember((prevGroupMember) => {
      const newGroupMember = new Set(prevGroupMember);
      newGroupMember.delete(item);
      return newGroupMember;
    });
  };

  const isMemberAlreadyAdded = (newGroupMember, item) => {
    return Array.from(newGroupMember).some(
      (member) => member.id === item.id || member.id === user.id,
    );
  };

  const handleSearch = () => {
    const trimmedKeyword = query.trim();
    if (trimmedKeyword) dispatch(searchUsers({ keyword: trimmedKeyword }));
  };

  return (
    <div className="relative h-full">
      {!newGroup && (
        <div>
          <div className="custom-bg flex items-center pb-5 pt-1">
            <BsArrowLeft
              className="ml-7 mt-4 cursor-pointer text-2xl font-bold"
              onClick={onClick}
            />
            <p className="ml-6 pt-3 text-xl font-semibold">Add Group Members</p>
            {groupMember.size > 0 && (
              <div
                className="-mb-3 ml-32 flex cursor-pointer items-center justify-center rounded-full bg-gray-600 p-2 pt-2"
                onClick={() => {
                  setNewGroup(true);
                }}
              >
                <BsArrowRight className="text-3xl font-bold text-white" />
              </div>
            )}
          </div>
          <div className={`relative bg-white px-3 py-4`}>
            <div className="flex flex-wrap space-x-2 space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    handleRemoveMember={handleRemoveMember}
                    member={item}
                    key={item.id}
                  />
                ))}
            </div>
            <input
              type="text"
              onChange={(e) => {
                const trimmedValue = e.target.value.trimStart();
                setQuery(trimmedValue);
                handleSearch(trimmedValue);
              }}
              className="ml-3 w-[93%] border-b border-[#8888] p-2 outline-none"
              placeholder="Search"
              value={query}
            />
          </div>
          <div className={`h-[79vh] overflow-y-auto bg-white px-3 `}>
            {query &&
              (searchUsers?.length === 0 ? (
                <EmptyItemsText content={"users"} />
              ) : (
                searchUsers
                  ?.filter((item) => item.id !== user.id)
                  .map(
                    (item) =>
                      !isMemberAlreadyAdded(new Set(groupMember), item) && (
                        <div
                          onClick={() => {
                            setGroupMember((prevGroupMember) => {
                              const newGroupMember = new Set(prevGroupMember);
                              newGroupMember.add(item);
                              return newGroupMember;
                            });
                            setQuery("");
                          }}
                          key={item?.id}
                        >
                          <hr />
                          {
                            <ChatCard
                              deleteIcon={false}
                              userImg={item.profilePicture || blankdp}
                              name={item.fullName}
                            />
                          }
                        </div>
                      ),
                  )
              ))}
          </div>
        </div>
      )}
      {newGroup && (
        <NewGroup
          setIsGroup={setIsGroup}
          groupMember={groupMember}
          setNewGroup={setNewGroup}
        />
      )}
    </div>
  );
};

export default CreateGroup;
