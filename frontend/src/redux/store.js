import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./chat/reducer";
import { messageReducer } from "./message/reducer";
import { userReducer } from "./user/reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export { store };
