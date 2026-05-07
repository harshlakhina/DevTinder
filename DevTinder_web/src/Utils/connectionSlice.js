import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice=createSlice({
    name:"connection",
    initialState:[],
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnections:()=>null
    }
})

export const {addConnections,removeConnections}=ConnectionSlice.actions

export default ConnectionSlice.reducer