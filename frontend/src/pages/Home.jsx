import { useState } from "react";
import LeftSection from "../components/leftSection/LeftSection";
import RightSection from "../components/rightSection/RightSection";
import "../styles/home/Home.css";

const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  return (
    <div className="relative w-[96rem] mx-auto ">
      <div className="w-full flex items-center justify-center ">
        <div className="flex bg-[#f0f2f5] h-[43.4rem] w-full top-[1.25rem]">
          <LeftSection
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            handleCurrentChat={handleCurrentChat}
          />
          <RightSection currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default Home;
