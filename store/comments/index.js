import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
	name: "comments",
	initialState: {
		comments: []
	},
	reducers: {
		addComment: (state, action) => {
			state.comments.push(action.payload);
		},
		removeComment: (state, action) => {
			const commentIndex = state.comments.findIndex(e => e === action.payload);
			if (commentIndex >= 0) {
				state.comments.splice(commentIndex, 1);
			}
		},
		clearComments: state => {
			state.comments = [];
		},
		setComments: (state, action) => {
			state.comments = action.payload || [];
		}
	}
});

export const { addComment, removeComment, clearComments, setComments } =
	commentsSlice.actions;
export default commentsSlice.reducer;
