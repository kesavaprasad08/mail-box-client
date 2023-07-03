import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  sentMails: [],
  receivedMails: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    addSentMails(state, action) {
      state.sentMails = action.payload;
    },
    addReceivedMails(state, action) {
      state.receivedMails = action.payload;
    },
    markMailAsRead(state,action) {
        state.receivedMails= state.receivedMails.map((mail)=>
        mail.id=== action.payload ?{...mail,isRead:true}:mail)
    }
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
