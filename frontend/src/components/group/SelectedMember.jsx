import { AiOutlineClose } from "react-icons/ai";
import blankdp from "./../../assets/blank-profile-picture.png";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center rounded-full bg-slate-300">
      <img
        className="h-7 w-7 rounded-full"
        src={member.profilePicture || blankdp}
        alt={member.fullName}
      />
      <p className="px-2"> {member.fullName} </p>
      <AiOutlineClose
        onClick={() => handleRemoveMember(member)}
        className="cursor-pointer pr-1"
      />
    </div>
  );
};

export default SelectedMember;
