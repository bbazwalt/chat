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

  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img className="h-14 w-14 rounded-full" src={userImg} alt={name} />
      </div>
      <div className=" w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">{name}</p>
          {deleteIcon && (
            <div className="relative ml-10" ref={menuRef}>
              <IoIosArrowDown
                className="text-base cursor-pointer"
                onClick={onArrowDownClick}
              />
              {menuOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded-md z-10">
                  <div
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
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
    </div>
  );
};

export default ChatCard;
