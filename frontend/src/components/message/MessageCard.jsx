import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteMessage, findAllMessages } from "../../redux/message/action";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const localDateString = getLocalDateString(createdAt);

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
      dispatch(findAllMessages({ chatId }));
    });
  };

  return (
    <div
      className={`flex max-w-[100%] flex-col rounded-md px-2 py-2 ${
        !isReqUserMessage
          ? "self-start bg-white"
          : "items-end self-end bg-gray-300"
      }`}
    >
      {isGroup && <p className="text-xs font-semibold">{fullName}</p>}
      <p className="break-all text-base font-bold">{content}</p>
      <div className="flex items-center justify-between rounded-md">
        <p className="text-xs font-light">{localDateString}</p>
        {isReqUserMessage && (
          <div className="relative" ref={menuRef}>
            <IoIosArrowDown
              className="-z-10 cursor-pointer text-base"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="absolute right-0 z-10 rounded-md bg-white shadow-md">
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
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
