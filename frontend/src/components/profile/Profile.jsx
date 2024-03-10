import Close from "@mui/icons-material/Close";
import { Avatar, Tooltip } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import blankProfilePicture from "../../assets/blank-profile-picture.png";
import { updateUser } from "../../redux/user/action";
import { CLEAR_USER_ERROR } from "../../redux/user/actionType";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import LoadingText from "../infoText/LoadingText";
import ErrorSnackBar from "../snackBar/ErrorSnackBar";

const Profile = ({ handleCloseOpenProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedFullName, setEditedFullName] = useState("");
  const [tempPicture, setTempPicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const user = useSelector((store) => store.user.user);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleImageChange = async (event) => {
    setIsUploading(true);
    const file = await uploadToCloudinary(event.target.files[0]);
    setTempPicture(file);
    dispatch(updateUser({ profilePicture: file }));
    setIsUploading(false);
  };

  const handleCheckClick = () => {
    setEditMode(false);
    const data = {
      id: user?.id,
      data: { fullName: editedFullName },
    };
    dispatch(updateUser(data));
  };

  const handleChange = (e) => {
    setEditedFullName(e.target.value);
  };

  return (
    <div>
      <div className="custom-bg flex items-center space-x-6  pb-5 pt-1">
        <BsArrowLeft
          className="ml-6 mt-4 cursor-pointer text-2xl  font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className=" mt-3 text-xl font-semibold">Profile</p>
      </div>
      <div className="my-8 flex flex-col items-center justify-center px-4">
        <Tooltip title="Change picture" placement="bottom">
          <label htmlFor="imgInput">
            <Avatar
              className="cursor-pointer"
              sx={{ width: "13rem", height: "13rem" }}
              alt="profile icon"
              src={tempPicture || user?.profilePicture || blankProfilePicture}
            />
          </label>
        </Tooltip>
        {isUploading && <LoadingText />}
        <input
          onChange={handleImageChange}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>
      <div className="my-20 bg-zinc-100 px-7">
        <p className="border-b py-3 text-green-800 ">Your name</p>
        {!editMode && (
          <div className="flex w-full items-center justify-between">
            <p className="py-3">{user?.fullName}</p>
            <BsPencilFill onClick={handleEditMode} className="cursor-pointer" />
          </div>
        )}
        {editMode && (
          <div className="flex w-full items-center justify-between py-2">
            <input
              onChange={handleChange}
              className="w-full border-b-2 border-gray-700 px-1 py-2 outline-none"
              type="text"
              placeholder="Enter your name"
            />
            {!editedFullName ? (
              <Close
                onClick={handleEditMode}
                className="absolute ml-[23rem] cursor-pointer"
              />
            ) : (
              <BsCheck2
                onClick={handleCheckClick}
                className="absolute ml-[23rem] cursor-pointer text-2xl"
              />
            )}
          </div>
        )}
      </div>
      {error && <ErrorSnackBar error={error} dispatchType={CLEAR_USER_ERROR} />}
    </div>
  );
};

export default Profile;
