import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUser, signOut } from "../../redux/auth/action";
import { useAuth } from "../../redux/auth/authContext";
import { createChat } from "../../redux/chat/action";
import { getAllMessages } from "../../redux/message/action";
import ChatCard from "../chat/ChatCard";
import CreateGroup from "../group/CreateGroup";
import Profile from "../profile/Profile";

import { CLEAR_CHAT_ERROR } from "../../redux/chat/actionType";
import LoadingText from "../loadingText/LoadingText";
import ErrorSnackBar from "../snackBar/ErrorSnackBar";
import blankGroupPicture from "./../../assets/blank-group-picture.jpg";
import blankProfilePicture from "./../../assets/blank-profile-picture.png";
import EmptyItemsText from "../infoText/EmptyItemsText";

const LeftSection = ({ currentChat, setCurrentChat, handleCurrentChat }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const chats = useSelector((store) => store.chat.chats);
  const isLoading = useSelector((store) => store.chat.isLoading);
  const error = useSelector((store) => store.chat.error);

  const { authSignOut } = useAuth();
  const [query, setQuery] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGroup, setIsGroup] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (currentChat?.id) dispatch(getAllMessages({ chatId: currentChat.id }));
  }, [currentChat, dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = (userId) => {
    dispatch(createChat(userId));
    setQuery("");
  };
  const handleSearch = (keyword) => {
    if (keyword.trim()) dispatch(searchUser({ keyword }));
  };

  const handleNavigate = () => {
    handleClose();
    setIsProfile(true);
  };

  const handleCloseOpenProfile = () => {
    handleClose();
    setIsProfile(false);
  };

  const handleCloseOpenGroup = () => {
    setIsGroup(false);
  };

  const handleCreateGroup = () => {
    handleClose();
    setIsGroup(true);
  };

  const handleSignOut = () => {
    handleClose();
    dispatch(signOut(authSignOut));
    navigate("/signin");
  };
  return (
    <div className=" h-full w-[30%] border-r bg-white">
      {isGroup && (
        <div className="h-full w-full">
          <CreateGroup setIsGroup={setIsGroup} onClick={handleCloseOpenGroup} />
        </div>
      )}
      {isProfile && (
        <div className="h-full w-full">
          <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
        </div>
      )}

      {!isProfile && !isGroup && (
        <div className="w-full  ">
          {
            <div className="custom-bg flex items-center justify-between p-3">
              <div
                onClick={handleNavigate}
                className="flex items-center space-x-3"
              >
                <img
                  className="h-10 w-10 cursor-pointer rounded-full"
                  src={auth.user?.profilePicture || blankProfilePicture}
                  alt={auth.user?.fullName}
                />
              </div>
              <div className="flex space-x-3 text-2xl">
                <div>
                  <BsThreeDotsVertical
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer text-xl"
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleCreateGroup}>New Group</MenuItem>
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          }

          <div className="relative flex items-center justify-center bg-white px-3 py-4">
            <input
              className="custom-bg w-[97%] rounded-md border-none py-2 pl-16 outline-none"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                const trimmedValue = e.target.value.trimStart();
                setQuery(trimmedValue);
                handleSearch(trimmedValue);
              }}
              value={query}
            />
            <AiOutlineSearch className="absolute left-7 right-3 top-7" />
          </div>
          {isLoading ? (
            <LoadingText />
          ) : (
            <div className="h-[34rem] overflow-y-scroll bg-white px-3">
              {query &&
                (auth?.searchUser?.length === 0 ? (
                  <EmptyItemsText content="users" />
                ) : (
                  auth?.searchUser?.map(
                    (item) =>
                      item?.id !== auth?.user?.id && (
                        <div
                          key={item?.id}
                          onClick={() => handleClickOnChatCard(item?.id)}
                        >
                          <hr />
                          <ChatCard
                            deleteIcon={false}
                            name={item?.fullName}
                            userImg={
                              item?.profilePicture || blankProfilePicture
                            }
                          />
                        </div>
                      ),
                  )
                ))}
              {!query && (Array.isArray(chats) && chats.length === 0 ? (
                <EmptyItemsText content="chats" />
              ) : (
                
                chats.map((item) => (
                  <div key={item.id} onClick={() => handleCurrentChat(item)}>
                    <hr />
                    {item.group ? (
                      <ChatCard
                        deleteIcon={true}
                        setCurrentChat={setCurrentChat}
                        handleCurrentChat={handleCurrentChat}
                        id={item.id}
                        currentChat={currentChat}
                        name={item.chatName}
                        userImg={item.chatImage || blankGroupPicture}
                      />
                    ) : (
                      <ChatCard
                        deleteIcon={true}
                        id={item.id}
                        currentChat={currentChat}
                        handleCurrentChat={handleCurrentChat}
                        setCurrentChat={setCurrentChat}
                        name={
                          auth.user?.id !== item.users[0]?.id
                            ? item.users[0]?.fullName
                            : item.users[1]?.fullName
                        }
                        userImg={
                          auth.user?.id !== item.users[0]?.id
                            ? item.users[0]?.profilePicture ||
                              blankProfilePicture
                            : item.users[1]?.profilePicture ||
                              blankProfilePicture
                        }
                      />
                    )}
                  </div>
                ))
              ))}
            </div>
          )}
        </div>
      )}
      {error && <ErrorSnackBar error={error} dispatchType={CLEAR_CHAT_ERROR} />}
    </div>
  );
};

export default LeftSection;
