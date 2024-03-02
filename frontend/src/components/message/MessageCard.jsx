import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteMessage, getAllMessages } from "../../redux/message/action";
import { getLocalDateString } from "../../utils/otherUtils";

const MessageCard = ({
  isReqUserMessage,
  content,
  createdAt,
  chatId,
  isGroup,
  fullName,
  id,
  currentChat,
}) => {
  const dispatch = useDispatch();

  const localDateString = getLocalDateString(createdAt);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDelete = () => {
    toggleMenu();
    dispatch(deleteMessage({ currentChat, id })).then(() => {
      dispatch(getAllMessages({ chatId }));
    });
  };

  return (
    <div
      className={`flex flex-col py-2 px-2 rounded-md max-w-[100%] ${
        !isReqUserMessage
          ? "self-start bg-white"
          : "items-end self-end bg-gray-300"
      }`}
    >
      {isGroup && <p className="text-xs font-semibold">{fullName}</p>}
      <p className="text-base font-bold break-all">{content}</p>
      <div className="flex justify-between items-center rounded-md">
        <p className="text-xs font-light">{localDateString}</p>
        {isReqUserMessage && (
          <div className="relative" ref={menuRef}>
            <IoIosArrowDown
              className="text-base -z-10 cursor-pointer"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="absolute right-0 bg-white shadow-md rounded-md z-10">
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline className="text-sm text-red-700" />
                  <span className="ml-2">Delete</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
