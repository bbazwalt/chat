import { Avatar, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import blankGroupPicture from "../../assets/blank-group-picture.jpg";
import { createGroup } from "../../redux/chat/action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const NewGroup = ({ groupMember, setIsGroup, setNewGroup }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [tempPicture, setTempPicture] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    setIsUploading(true);
    const file = await uploadToCloudinary(event.target.files[0]);
    setTempPicture(file);
    setIsUploading(false);
  };

  const handleCreateGroup = () => {
    const userIds = [];
    for (const user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds,
      chatName: groupName,
      chatImage: tempPicture,
    };
    dispatch(createGroup(group));
    setIsGroup(false);
  };

  return (
    <div className="h-full w-full">
      <div className="custom-bg flex items-center pb-5 pt-1">
        <BsArrowLeft
          className="ml-7 mt-4  cursor-pointer text-2xl font-bold"
          onClick={() => {
            setNewGroup(false);
          }}
        />
        <p className="ml-6 mt-3 text-xl font-semibold">New Group</p>
        {groupName && (
          <div
            className="-mb-3 ml-56 flex cursor-pointer items-center justify-center rounded-full bg-gray-600 p-2 pt-2"
            onClick={handleCreateGroup}
          >
            <BsCheck2 className="text-3xl font-bold text-white" />
          </div>
        )}
      </div>
      <div className="my-14 flex flex-col items-center justify-center">
        <label htmlFor="imgInput" className="relative">
          <Avatar
            sx={{ width: "13rem", height: "13rem" }}
            alt="group icon"
            src={tempPicture || blankGroupPicture}
          />
          {isUploading && (
            <CircularProgress className="absolute left-[5.25rem] top-[5rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={handleImageChange}
          value={""}
        />
      </div>
      <div className="flex w-full items-center justify-between px-5 py-2">
        <input
          className="w-full border-b-2 border-gray-600 bg-transparent px-1 py-2 outline-none"
          placeholder="Group Name"
          value={groupName}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewGroup;
