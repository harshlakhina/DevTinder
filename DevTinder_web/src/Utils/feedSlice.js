import {createSlice} from "@reduxjs/toolkit"



const FeedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFeedById:(state,action)=>{
            const id=action.payload;
            return state.filter((feed)=>feed._id!=id)
        }
    }
})


export const {addFeed,removeFeedById}=FeedSlice.actions;
export default FeedSlice.reducer