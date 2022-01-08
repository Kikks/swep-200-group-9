import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./user";
import commentsReducer from "./comments";

const store = configureStore({
	reducer: {
		user: userReducer,
		comments: commentsReducer
	},
	middleware: [thunk]
});

export default store;
