import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteChat } from "../../redux/chat/action";

const ChatCard = ({
  id,
  userImg,
  name,
  deleteIcon,
  currentChat,
  handleCurrentChat,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const dispatch = useDispatch();

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

  const onArrowDownClick = (event) => {
    event.stopPropagation();
    toggleMenu();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    toggleMenu();
    dispatch(deleteChat(id)).then(() => {
      if (currentChat?.id === id) {
        handleCurrentChat(null);
      }
    });
  };

  return (
    <div className="flex cursor-pointer items-center justify-center py-2 transition duration-300  hover:bg-zinc-100">
      <div className="w-[20%]">
        <img className="h-14 w-14 rounded-full" src={userImg} alt={name} />
      </div>
      <div className="flex w-[80%] items-center justify-between">
        <p className="text-lg">{name}</p>
        {deleteIcon && (
          <div className="relative ml-10" ref={menuRef}>
            <IoIosArrowDown
              className="cursor-pointer text-base"
              onClick={onArrowDownClick}
            />
            {menuOpen && (
              <div className="absolute right-0 z-10 rounded-md bg-white shadow-md">
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline className="text-md text-red-700" />
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

export default ChatCard;
