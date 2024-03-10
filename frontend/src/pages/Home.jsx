import { useState } from "react";
import LeftSection from "../components/leftSection/LeftSection";
import RightSection from "../components/rightSection/RightSection";

const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[96rem] bg-[#f0f2f5]">
      <LeftSection
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        handleCurrentChat={handleCurrentChat}
      />
      <RightSection currentChat={currentChat} />
    </div>
  );
};

export default Home;
