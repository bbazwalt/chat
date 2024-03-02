import { Avatar, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import blankGroupPicture from "../../assets/blank-group-picture.jpg";
import { createGroup } from "../../redux/chat/action";
import { updateGroupImage } from "../../utils/uploadToCloudinary";

const NewGroup = ({ groupMember, setIsGroup, setNewGroup }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const dispatch = useDispatch();
  const handleCreateGroup = () => {
    let userIds = [];
    for (let user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds,
      chatName: groupName,
      chatImage: groupImage,
    };

    dispatch(createGroup(group));
    setIsGroup(false);
  };

  return (
    <div className="h-full w-full">
      <div className="custom-bg flex items-center space-x-6 pb-5 pt-1">
        <BsArrowLeft
          className="ml-7 mt-4  cursor-pointer text-2xl font-bold"
          onClick={() => {
            setNewGroup(false);
          }}
        />
        <p className="mt-3 text-xl font-semibold">New Group</p>
      </div>

      <div className="my-14 flex flex-col items-center justify-center">
        <label htmlFor="imgInput" className="relative">
          <Avatar
            sx={{ width: "13rem", height: "13rem" }}
            alt="group icon"
            src={groupImage || blankGroupPicture}
          />
          {isImageUploading && (
            <CircularProgress className="absolute left-[5.25rem] top-[5rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) =>
            updateGroupImage({
              pics: e.target.files[0],
              setIsImageUploading,
              setGroupImage,
            })
          }
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
      {groupName && (
        <div className="mt-[11.5rem] flex items-center justify-center bg-slate-200 pt-0.5">
          <Button onClick={handleCreateGroup}>
            <div className="rounded-full bg-gray-600 p-3">
              <BsCheck2 className="text-3xl font-bold text-white" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
