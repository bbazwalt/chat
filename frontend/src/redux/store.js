import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/reducer";
import { chatReducer } from "./chat/reducer";
import { messageReducer } from "./message/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export { store };
